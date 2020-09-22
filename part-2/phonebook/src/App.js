import React, { useEffect, useState } from 'react'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification'
import personService from './services/persons'
import Input from './components/Input'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [isError, setIsError] = useState(false)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const personsToShow = searchTerm === ''
    ? persons
    : persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const addPerson = (event) => {
    event.preventDefault()

    if (persons.find(person => person.name.toLowerCase() === newName.toLowerCase())) {
      if (window.confirm(`${newName} has already been added to the phonebook. Replace the old number with ${newNumber}?`)) {
        const selectedPerson = {
          ...persons.find(person => person.name.toLowerCase() === newName.toLowerCase()),
          number: newNumber
        }

        personService
          .updateNumber(selectedPerson.id, selectedPerson)
          .then(returnedPerson => {
            setPersons(persons.map(person => person.id !== selectedPerson.id ? person : returnedPerson))
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            console.log(error)
            setIsError(true)
            setPersons(persons.filter(person => person.id !== selectedPerson.id))

            setNotificationMessage(
              `Error: Could not change the number. ${selectedPerson.name} has already been removed from the server.`
            )

            setTimeout(() => {
              setNotificationMessage(null)
              setIsError(false)
            }, 5000)

            return
          })

        setNotificationMessage(
          `Changed number for ${selectedPerson.name}`
        )

        setTimeout(() => {
          setNotificationMessage(null)
        }, 5000)
      }

      return
    }

    const personObject = {
      name: newName, number: newNumber
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })

    setNotificationMessage(
      `Added ${personObject.name}`
    )

    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const deletePerson = (event) => {
    const id = parseInt(event.target.value)
    const name = event.target.dataset.name

    if (window.confirm(`Delete ${name}?`)) {
      personService
        .deleteById(id)
        .then(setPersons(persons.filter(person => person.id !== id)))
        .catch(error => {
          console.log(error)
          setIsError(true)
          setPersons(persons.filter(person => person.id !== id))

          setNotificationMessage(
            `Error: ${name} has already been removed from the server.`
          )

          setTimeout(() => {
            setNotificationMessage(null)
            setIsError(false)
          }, 5000)

          return
        })

      setNotificationMessage(
        `Deleted ${name}`
      )

      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Notification message={notificationMessage} isError={isError} />
      <Input text="Search" value={searchTerm} eventHandler={handleSearchTermChange} />
      <h2>Add person</h2>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons persons={personsToShow} eventHandler={deletePerson} />
    </div>
  )
}

export default App