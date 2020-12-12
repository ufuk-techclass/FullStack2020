import React, { useState, useEffect } from 'react'
import Persons from './Persons'
import Filter from './Filter'
import PersonForm from './PersonForm'
import axios from 'axios'

const App = () => {
    const [persons, setPersons] = useState([])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [myFilter, setMyFilter] = useState('')

    const hook = () => {
        console.log('effect')
        axios
            .get('http://localhost:3001/persons')
            .then(response => {
                console.log('promise fulfilled')
                setPersons(response.data)
            })
    }

    useEffect(hook, [])

    //create Id
    let randomId = () => {
        return Math.random();
    };

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
            setPersons(persons.concat(noteObject));
            setNewName('')
            setNewNumber('')
            setMyFilter('')
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