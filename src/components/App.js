import React, { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', id: 0 }
    ])
    const [newName, setNewName] = useState('')

    //create Id
    let randomId = () => {
        return Math.random();
    };

    const addNote = (event) => {
        event.preventDefault()

        const noteObject = {
            name: newName, id: randomId()
        }

        const result = persons.filter(p => p.name === newName)

        if (result.length !== 0) {
            setNewName('')
            alert(`${newName} is already added to phonebook`);
        }
        else {
            setPersons(persons.concat(noteObject));
            setNewName('')
        }
    }

    const handleNoteChange = (event) => {
        console.log(event.target.value)
        setNewName(event.target.value)
    }

    return (
        <div>
            <h2>Phonebook</h2>
            <form onSubmit={addNote}>
                <div>
                    name: <input value={newName} onChange={handleNoteChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <div>
                {persons.map(e =>
                    <div key={e.id} > {e.name} </div>
                )}
            </div>
        </div>
    )
}

export default App