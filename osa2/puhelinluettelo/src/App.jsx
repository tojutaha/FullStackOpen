import { useState } from 'react'

const App = () => {
    const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [originalPersons, setOriginalPersons] = useState(persons)
  const [filterInput, setFilterInput] = useState("")

  const addPerson = (event) => {
    event.preventDefault()
    const newEntry = {
      name: newName,
      number: newNumber,
    }

    const exists = persons.some(newEntry => newEntry.name === newName)
    if (exists) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(newEntry))
      setNewName('')
      setNewNumber('')
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    const inputValue = event.target.value.toLowerCase()
    if (inputValue.length === 0) {
      setPersons(originalPersons)
    } else {
      setFilterInput(inputValue)
      const filter = originalPersons.filter(person => person.name.toLowerCase().includes(inputValue))
      setPersons(filter)
    }
  }

  const handleBackSpace =() => {
    const newFilterInput = filterInput.slice(0, -1)
    setFilterInput(newFilterInput)
    const filter = originalPersons.filter(person => person.name.toLowerCase().includes(newFilterInput));
    setPersons(filter);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with <input onChange={handleFilterChange} onKeyDown={(e) => {
        if (e.key === "Backspace") {
          handleBackSpace()
        }
      }} />
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map((person) => (
          <li key={person.name}>{person.name} {person.number}</li>
        ))}
      </ul>
      <div>debug: {newName}</div>
    </div>
  )

}

export default App