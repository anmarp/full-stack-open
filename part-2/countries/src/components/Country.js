import React from 'react'
import Weather from './Weather'

const Country = ({ country }) => {
  return (
    <div>
      <h1>{country.name}</h1>
      <p><b>Capital:</b> {country.capital}</p>
      <p><b>Population:</b> {country.population}</p>
      <h2>Languages</h2>
      <ul>
        {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} alt={`Flag of ${country.name}`} height='100' />
      <Weather country={country} />
    </div>
  )
}

export default Country