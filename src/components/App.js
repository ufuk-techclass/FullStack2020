import React, { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-1234567', id: 0 }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')

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
            alert(`${newName} is already added to phonebook`);
        }
        else {
            setPersons(persons.concat(noteObject));
            setNewName('')
            setNewNumber('')
        }
    }

    const handleNoteChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        console.log(event.target.value)
        setNewNumber(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
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
                {persons.map(e =>
                    <div key={e.id} > {e.name} {e.number}</div>
                )}
            </div>
        </div>
    )
}

export default App