import React from 'react'

const Persons = ({ persons, searchKey }) => {
    return (
        <>
            {
                persons
                    .filter(
                        person => person.name.toLowerCase().includes(searchKey.toLowerCase())
                    )
                    .map(
                        person => (<div key={person.name}>{person.name} {person.number}</div>)
                    )
            }
        </>
    )
}

export default Persons