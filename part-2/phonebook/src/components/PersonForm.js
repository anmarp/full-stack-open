import React from 'react'
import Input from './Input'

const PersonForm = ({ addPerson, newName, newNumber, handleNameChange, handleNumberChange }) => {
  return (
    <form onSubmit={addPerson}>
      <Input text='Name' value={newName} eventHandler={handleNameChange} />
      <Input text='Number' value={newNumber} eventHandler={handleNumberChange} />
      <div><button type="submit">Add</button></div>
    </form>
  )
}

export default PersonForm