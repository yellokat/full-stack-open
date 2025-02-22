import React from 'react'
import DeleteButton from './deleteButton'

const Persons = ({ persons, searchKey, handleDelete }) => {
    return (
        <>
            {
                persons
                    .filter(
                        person => person.name.toLowerCase().includes(searchKey.toLowerCase())
                    )
                    .map(
                        person => (<div key={person.name}>{person.name} {person.number} <DeleteButton onClick={()=>handleDelete(person.id)}/></div>)
                    )
            }
        </>
    )
}

export default Persons