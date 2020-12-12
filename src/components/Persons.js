import React from 'react'
import Person from './Person'

const Persons = ({ myFilter, persons }) => {
    return (
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

    )
}

export default Persons