const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://tomihalko:${password}@cluster0.fgsgs5a.mongodb.net/testNoteApp?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})


const Note = mongoose.model('Note', noteSchema)

if(1)
{
  const note = new Note({
    //content: 'HTML is Easy',
    //content: 'CSS is Hard',
    content: 'Mongoose makes things easy',
    important: true,
  })

  note.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
  })
}

if(0)
{
  Note.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })
}
