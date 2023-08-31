const Country = ({ countries, filterInput }) => {
  //console.log(countries);
  //console.log(countries[0].name.common);
  //console.log(countries.length);
  //console.log(filterInput)

  if (countries.length > 10) {
    return (
      <>
      Too many matches, specify another filter
      </>
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

  let i = 0;
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