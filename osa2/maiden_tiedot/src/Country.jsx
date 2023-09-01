const Country = ({ countries, setCountries }) => {

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
    console.log(country)
    return (
      <div>
        <h1>{country.name.common}</h1>
        capital {country.capital}
        <br />
        area {country.area}
        <h2>languages:</h2>
        <ul>
          {Object.values(country.languages).map((language, key) => (
            <li key={key}>{language}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt=""></img>
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