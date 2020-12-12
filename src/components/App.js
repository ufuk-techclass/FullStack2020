import React, { useState, useEffect } from 'react'
import Persons from './Persons'
import Filter from './Filter'
import PersonForm from './PersonForm'
import axios from 'axios'
import personService from '../services/persons'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [myFilter, setMyFilter] = useState('')

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
    }

    useEffect(hook, [])




    const addNote = (event) => {
        event.preventDefault()

        const noteObject = {
            name: newName, number: newNumber, id: randomId()
        }

        const result = persons.filter(p => p.name === newName)

        if (result.length !== 0) {
            setNewName('')
            setNewNumber('')
            setMyFilter('')
            alert(`${newName} is already added to phonebook`);
        }
        else {
            personService
                .create(noteObject)
                .then(returnedPerson => {
                    // setPersons(response)
                    setPersons(persons.concat(returnedPerson));
                    setNewName('')
                    setNewNumber('')
                    setMyFilter('')
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

    return (
        <div>
            <h2>Phonebook</h2>
            <Filter handleSearch={handleSearch} />
            <h3>Add a new</h3>
            <PersonForm addNote={addNote} newName={newName} handleNoteChange={handleNoteChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
            <h3>Numbers</h3>
            <Persons myFilter={myFilter} persons={persons} />
        </div>
    )
}

export default App