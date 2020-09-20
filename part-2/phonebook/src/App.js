import React, { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ])
    const [newName, setNewName] = useState('')
    const [newNumber, setNewNumber] = useState('')
    const [searchTerm, setSearchTerm] = useState('')

    const personsToShow = searchTerm === ''
        ? persons
        : persons.filter(person => person.name.toLowerCase().includes(searchTerm.toLowerCase()))

    const addPerson = (event) => {
        event.preventDefault()

        if (persons.find(person => person.name.toLowerCase() === newName.toLowerCase())) {
            alert(`${newName} is already added to phonebook`)
            return
        }

        const personObject = {
            name: newName, number: newNumber
        }

        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
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
            <h2>Phonebook</h2>
            <input value={searchTerm} onChange={handleSearchTermChange} />
            <form onSubmit={addPerson}>
                <div>
                    name: <input value={newName} onChange={handleNameChange} />
                </div>
                <div>
                    number: <input value={newNumber} onChange={handleNumberChange} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
            <h2>Numbers</h2>
            <div>{personsToShow.map(person => <div key={person.name}>{person.name} {person.number}</div>)}</div>
        </div>
    )
}

export default App