const express = require("express")
const app = express()
app.use(express.json())

let persons = [
    {
        name: "Arto Hellas",
        number: "000",
        id: 1
    },
    {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2
    },
    {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 3
    },
    {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 4
    }
]
  
app.get("/", (req, res,) => {
    res.send("Nothing to see here.")
})

app.get("/info/", (req, res,) => {
    let currentDate = new Date()
    const html = `
        <p>Phonebook has info for ${persons.length} people</p>
        <p>${currentDate.toString()}</p>
    `
    res.send(html)
})


app.get("/api/persons/", (req, res) => {
    res.json(persons)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})