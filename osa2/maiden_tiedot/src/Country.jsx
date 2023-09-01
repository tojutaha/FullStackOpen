import React, { useState, useEffect } from "react"
import axios from "axios"

// NOTE: Local .env variable
const api_key = import.meta.env.VITE_SOME_KEY

const Country = ({ countries, setCountries }) => {
  const [weather, setWeather] = useState(null)

  useEffect(() => {
    if (countries.length === 1) {
      const country = countries[0]
      const url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${country.capital}&APPID=${api_key}`

      axios.get(url)
        .then(response => {
          setWeather(response.data)
          //console.log(response.data)
        })
        .catch(error => {
          console.log("Error fetching weather data", error)
        })
    }
  }, [countries])

  if (countries.length > 10) {
    return (
      <>
        Too many matches, specify another filter
      </>
    )
  }

  let i = 0;
  if (countries.length <= 10 && countries.length > 1) {
    return (
      <ul>
        {countries.map((country) => (
          <li key={i++}>
            {country.name.common}
            <button onClick={() => {
              const newCountries = countries.filter(c => c.name.common === country.name.common)
              setCountries(newCountries)
            }}>
              show
            </button>
          </li>
        ))}
      </ul>
    )
  }

  if (countries.length === 1) {
    const country = countries[0]
    //console.log(country)
    
    if (!weather) {
      return (
        <div>Loading...</div>
      )
    }

    //console.log("Weather", weather)

    return (
      <div>
        <h1>{country.name.common}</h1>
        Capital {country.capital}
        <br />
        Area {country.area}
        <h2>Languages:</h2>
        <ul>
          {Object.values(country.languages).map((language, key) => (
            <li key={key}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt=""></img>
        <h2>{`Weather in ${country.capital}`}</h2>
        Temperature {weather.main.temp} Celcius
        <br />
        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" title={`${weather.weather[0].main}`}></img>
        <br />
        Wind {weather.wind.speed} m/s
      </div>
    )
  }

  return (
    <ul>
      {countries.map((country) => (
        <li key={i++}>
          {country.name.common}
        </li>
      ))}
    </ul>
  )
}

export default Country