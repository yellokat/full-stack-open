import { useState, useEffect } from 'react'
import Filter from './components/filter'
import PersonForm from './components/personForm'
import Persons from './components/persons'
import personService from './services/personService'
import SuccessMessage from './components/successMessage'
import ErrorMessage from './components/errorMessage'

const App = () => {
  const [persons, setPersons] = useState([])

  // ===========================================================================
  // init data via GET request
  // ===========================================================================
  const hook = () => {
    personService
      .getAll()
      .then(
        data => setPersons(data)
      )
  }
  useEffect(hook, [])

  // ===========================================================================
  // state & change handlers
  // ===========================================================================
  const [newNumber, setNewNumber] = useState('')
  const [newName, setNewName] = useState('')
  const [searchKey, setSearchKey] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleNameFormChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberFormChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchFormChange = (event) => {
    setSearchKey(event.target.value)
  }

  // show success indicator for 2 seconds
  const toggleSuccessMessage = (message) => {
    setSuccessMessage(message)
    setTimeout(() => {
      setSuccessMessage('')
    }, 2000)
  }

  const toggleErrorMessage = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage('')
    }, 2000)
  }

  // ===========================================================================
  // submit handler
  // ===========================================================================

  const handleSubmit = (event) => {
    event.preventDefault()

    // if duplicate, update number on user confirmation
    let foundPerson = persons.find(person => person.name === newName)
    if (foundPerson !== undefined) {
      if (window.confirm(`${foundPerson.name} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = {
          id: foundPerson.id,
          name: foundPerson.name,
          number: newNumber
        }
        personService
          .update(foundPerson.id, updatedPerson)
          .then(
            data => {
              setPersons(
                persons.map(person => person.id === data.id ? data : person)
              )
              toggleSuccessMessage(`Updated ${data.name}'s number.`)
            }
          )
          .catch(
            error => {
              if (error.response.status === 404) {
                toggleErrorMessage(`Information of ${foundPerson.name} has already been removed from server.`)
                setPersons(persons.filter(person => person.id !== foundPerson.id))
              }
            }
          )
      }
      return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }

    // save remotely
    personService
      .create(personObject)
      .then(
        data => setPersons(persons.concat(data))
      )

    // reset state and form
    setNewName('')
    setNewNumber('')
    document.getElementById('nameForm').value = ''
    document.getElementById('numberForm').value = ''

    // show success message
    toggleSuccessMessage(`Added ${personObject.name}.`)
  }

  // ===========================================================================
  // delete handler
  // ===========================================================================

  const handleDelete = (id) => {
    const person = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(id)
        .then(
          data => setPersons(persons.filter(person => person.id !== id))
        )
    }
  }

  // ===========================================================================
  // view
  // ===========================================================================

  return (
    <div>
      <h2>Phonebook</h2>
      <SuccessMessage message={successMessage} />
      <ErrorMessage message={errorMessage} />
      <Filter onChange={handleSearchFormChange} />

      <h2>add a new</h2>
      <PersonForm
        handleNameFormChange={handleNameFormChange}
        handleNumberFormChange={handleNumberFormChange}
        handleSubmit={handleSubmit} />

      <h2>Numbers</h2>
      <Persons persons={persons} searchKey={searchKey} handleDelete={handleDelete} />
    </div>
  )
}

export default App