require("dotenv").config()
const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()
const Person = require("./models/person")

app.use(express.static("dist"))
app.use(express.json())
app.use(cors())

morgan.token('response-json', function (req, res) {
  if (req.method === "GET") {
    return ""
  }

  return JSON.stringify(req.body)
})

app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens['response-json'](req, res)
  ].join(' ')
}))

app.get("/api/persons/", (req, res) => {
  Person.find({}).then(person => {
    res.json(person)
  })
})

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
        res.json(person)
    })
    .catch(err => next(err))
})

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(person => {
      res.status(204).end()
    })
  .catch(error => next(error))
})

app.post("/api/persons", (req, res, next) => {
  const body = req.body
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "name or number cannot be empty"
    })
  }

  const person = {
    name: body.name,
    number: body.number,
  }

  Person.findOneAndUpdate({name: body.name }, person, {new: true, upsert: true})
    .then(updatedPerson => {
      res.json(updatedPerson)
    })
  .catch(error => next(error))
})

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
