import { useState } from 'react'
import Filter from './components/filter'
import PersonForm from './components/personForm'
import Persons from './components/persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  // ===========================================================================
  // state & change handlers
  // ===========================================================================
  const [newNumber, setNewNumber] = useState('')
  const [newName, setNewName] = useState('')
  const [searchKey, setSearchKey] = useState('')

  const handleNameFormChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberFormChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchFormChange = (event) => {
    setSearchKey(event.target.value)
  }

  // ===========================================================================
  // submit handler
  // ===========================================================================

  const handleSubmit = (event) => {
    event.preventDefault()

    // prevent duplicate entries
    if (persons.find(person => person.name === newName) !== undefined) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(personObject))

    // reset state and form
    setNewName('')
    setNewNumber('')
    document.getElementById('nameForm').value = ''
    document.getElementById('numberForm').value = ''
  }

  // ===========================================================================
  // view
  // ===========================================================================

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter onChange={handleSearchFormChange} />

      <h2>add a new</h2>
      <PersonForm
        handleNameFormChange={handleNameFormChange}
        handleNumberFormChange={handleNumberFormChange}
        handleSubmit={handleSubmit} />

      <h2>Numbers</h2>
      <Persons persons={persons} searchKey={searchKey} />
    </div>
  )
}

export default App