import personService from '../services/persons'
import React, { useState, useEffect } from 'react'
import Persons from './Persons'
import Filter from './Filter'
import PersonForm from './PersonForm'
import Notification from './Notification'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [myFilter, setMyFilter] = useState('')
    const [infoMessage, setInfoMessage] = useState(null)
    const [infoSuccess, setInfoSuccess] = useState(true)

    //create Id (very low chance to assign same id to 2 different person)
    //Date.now() could be better
    let randomId = () => {
        return Math.random();
    };


    const hook = () => {
        console.log('get all persons')
        personService
            .getAll()
            .then(initialNotes => {
                setPersons(initialNotes)
            })
            .catch(error => {
                console.log("error: ", error)
            })
    }

    useEffect(hook, [])

    const addNote = (event) => {
        event.preventDefault()

        const noteObject = {
            name: newName, number: newNumber, id: randomId()
        }

        const result = persons.filter(p => p.name === newName)

        //if input name matches with the list
        if (result.length !== 0) {
            //update number, if confirmed
            if (window.confirm(`${newName}  is already in the phonebook, replace the old number with a new one?`)) {
                //update person object with the new number
                const updatedPerson = { ...result[0], number: newNumber }

                personService
                    .update(result[0].id, updatedPerson)
                    .then(() => {
                        hook();
                        setNewName('');
                        setNewNumber('');
                        setInfoSuccess(true)
                        setInfoMessage(`${updatedPerson.name}'s phone numeber is updated`)
                        setTimeout(() => {
                            setInfoMessage(null)
                        }, 2000);
                    })
                    .catch(error => {
                        setInfoSuccess(false)
                        console.log("error: ", error)
                    })

            }
            //reset states, if unconfirmed
            else {
                setNewName('')
                setNewNumber('')
                setMyFilter('')
            }

        }
        //input name does not match with the list
        //add new person to the list
        else {
            personService
                .create(noteObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson));
                    setNewName('')
                    setNewNumber('')
                    setMyFilter('')
                    setInfoSuccess(true)
                    setInfoMessage(`${returnedPerson.name} is added`)
                    setTimeout(() => {
                        setInfoMessage(null)
                    }, 2000)

                })
                .catch(error => {
                    setInfoSuccess(false)
                    console.log("error: ", error)
                })

        }
    }

    const handleNoteChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleSearch = (event) => {
        const mySearch = persons.filter(p => p.name.toLowerCase().includes(event.target.value.toLowerCase()) ? p : console.log("no"))
        mySearch.length > 0 ?
            setMyFilter(mySearch)
            : setMyFilter('')
    }

    const handleDelete = (selectedPerson) => {
        if (window.confirm(`Delete ${selectedPerson.name} `)) {
            personService
                .deletePerson(selectedPerson.id)
                .then(() => {
                    hook()
                    setInfoSuccess(true)
                    setInfoMessage(`${selectedPerson.name} is successfully deleted `)
                    setTimeout(() => {
                        setInfoMessage(null)
                    }, 2000)
                })
                .catch(error => {
                    setInfoSuccess(false)
                    setInfoMessage(`${selectedPerson.name} has already been removed from server`)
                    setTimeout(() => {
                        setInfoMessage(null)
                    }, 2000);
                    console.log("error: ", error)
                })
        }
    }

    return (
        <div>
            <Notification message={infoMessage} infoSuccess={infoSuccess} />
            <h2>Phonebook</h2>
            <Filter handleSearch={handleSearch} />
            <h3>Add a new</h3>
            <PersonForm addNote={addNote} newName={newName} handleNoteChange={handleNoteChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
            <h3>Numbers</h3>
            <Persons myFilter={myFilter} persons={persons} handleDelete={handleDelete} />
        </div>
    )
}

export default App