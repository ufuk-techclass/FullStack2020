import React, { useState } from 'react'
import Person from './Person'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-1234567', id: 0 },
        { name: 'Ada Lovelace', number: '39-44-5323523', id: 1 },
        { name: 'Dan Abramov', number: '12-43-234345', id: 2 },
        { name: 'Mary Poppendieck', number: '39-23-6423122', id: 3 }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [myFilter, setMyFilter] = useState('')

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
            <div>
                filter shown with: <input onChange={handleSearch} />
            </div>
            <h2>add a new</h2>
            <form onSubmit={addNote}>
                <div>
                    name: <input value={newName} onChange={handleNoteChange} />
                </div>
                <div>
                    number: <input value={newNumber} onChange={handleNumberChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <div>
                {myFilter.length > 0
                    ?
                    myFilter.map(person =>
                        <Person key={person.id} person={person} />
                    )
                    : persons.map(person =>
                        <Person key={person.id} person={person} />
                    )}
            </div>
        </div>
    )
}

export default App