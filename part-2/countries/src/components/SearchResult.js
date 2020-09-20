import React from 'react'
import Country from './Country'

const SearchResult = ({ searchResult, eventHandler }) => {
  if (searchResult.length > 10) {
    return (
      <div>Too many matches, specify another filter</div>
    )
  }

  if (searchResult.length === 1) {
    return (
      <Country country={searchResult[0]} />
    )
  }

  return (
    <div>
      {searchResult.map(country => 
        <div key={country.name}>
          {country.name} <button value={country.name} onClick={eventHandler}>Show</button>
        </div>)}
    </div>
  )
}

export default SearchResult