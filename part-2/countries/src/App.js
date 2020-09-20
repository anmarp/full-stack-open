import React, { useEffect, useState } from 'react'
import SearchResult from './components/SearchResult'
import axios from 'axios'

const App = () => {
  const [countries, setCountries] = useState([])
  const [searchTerm, setSearchTerm] = useState('')

  const searchResult = searchTerm === ''
    ? []
    : countries.filter(country => country.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()))

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value)
  }
  const handleClick = (event) => {
    setSearchTerm(event.target.value)
  }

  return (
    <div>
      Search countries: <input value={searchTerm} onChange={handleSearchTermChange} />
      <SearchResult searchResult={searchResult} eventHandler={handleClick} />
    </div>
  )
}

export default App