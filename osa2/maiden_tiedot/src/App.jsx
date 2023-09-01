import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Country from './Country'

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/"

function App() {
  const [countries, setCountries] = useState([])
  const [originalCountries, setOriginalCountries] = useState(countries)
  const [filterInput, setFilterInput] = useState("")

  useEffect(() => {
    axios.get(`${baseUrl}/api/all`)
      .then((response) => {
        setCountries(response.data)
        setOriginalCountries(response.data)
    })
  }, [])

  const handleFilterChange = (event) => {
    const inputValue = event.target.value.toLowerCase()

    if (inputValue.length === 0) {
      setCountries(originalCountries)
    } else {
      setFilterInput(inputValue)
      const filter = originalCountries.filter(country => country.name.common.toLowerCase().includes(inputValue))
      setCountries(filter)
    }
  }

  return (
    <div>
      <Filter handleFilterChange={handleFilterChange} />
      <Country countries={countries} setCountries={setCountries}/>
    </div>
  )
}

export default App
