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
  //console.log("Countries", countries)
  //console.log("Original",originalCountries)

  const handleFilterChange = (event) => {
    const inputValue = event.target.value.toLowerCase()
    //console.log("inputValue", inputValue)
    if (inputValue.length === 0) {
      setCountries(originalCountries)
      //console.log("Countries", countries)
      //console.log("Original", originalCountries)
    } else {
      setFilterInput(inputValue)
      const filter = originalCountries.filter(country => country.name.common.toLowerCase().includes(inputValue))
      setCountries(filter)
      //console.log("Filter", filter)
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
