import React from 'react'

const Persons = ({ persons, eventHandler }) => {
  return (
    <div>
      {persons.map(person => 
      <div key={person.id}>
        {person.name} {person.number} <button value={person.id} data-name={person.name} onClick={eventHandler}>Delete</button>
      </div>)}
    </div>
  )
}

export default Persons