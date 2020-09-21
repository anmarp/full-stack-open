import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Weather = ({ country }) => {
  const api_key = process.env.REACT_APP_API_KEY
  const [weatherData, setWeatherData] = useState({})
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    console.log('effect')
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${country.capital},${country.alpha2Code}&units=metric&appid=${api_key}`)
      .then(response => {
        console.log('promise fulfilled')
        setWeatherData(response.data)
        setIsLoaded(true)
      })
  }, [api_key, country])

  return (
    <div>
      <h2>Weather in {country.capital}</h2>
      {isLoaded && (
        <div>
          <p><b>Temperature: </b>{weatherData.main.temp} &deg;C</p>
          <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt={weatherData.weather[0].description} />
          <p><b>Wind: </b>{weatherData.wind.speed} m/s, direction: {weatherData.wind.deg}&deg;</p>
        </div>
      )}
    </div>
  )
}

export default Weather