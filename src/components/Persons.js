import React from 'react'
import Person from './Person'

const Persons = ({ myFilter, persons, handleDelete }) => {
    return (
        <div>
            {myFilter.length > 0
                ?
                myFilter.map(person =>
                    <Person key={person.id} person={person} handleDelete={handleDelete} />
                )
                : persons.map(person =>
                    <Person key={person.id} person={person} handleDelete={handleDelete} />
                )}
        </div>

    )
}

export default Persons