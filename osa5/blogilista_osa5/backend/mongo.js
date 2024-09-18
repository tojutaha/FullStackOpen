const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://tomihalko:${password}@cluster0.fgsgs5a.mongodb.net/testBlogiLista?retryWrites=true&w=majority`
//const url = `mongodb+srv://tomihalko:${password}@cluster0.fgsgs5a.mongodb.net/Blogilista?retryWrites=true&w=majority`

mongoose.set('strictQuery', false)
mongoose.connect(url)

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

if(0)
{
  const blog = new Blog({
    // title: 'React patterns',
    // author: 'Michael Chan',
    // url: 'https://reactpatterns.com/',
    // likes: 7,

    // title: 'Go To Statement Considered Harmful',
    // author: 'Edsger W. Dijkstra',
    // url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    // likes: 5,

    // title: 'Canonical string reduction',
    // author: 'Edsger W. Dijkstra',
    // url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    // likes: 12,

    // title: 'First class tests',
    // author: 'Robert C. Martin',
    // url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    // likes: 10,

    // title: 'TDD harms architecture',
    // author: 'Robert C. Martin',
    // url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    // likes: 0,

    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
  })

  blog.save().then(() => {
    console.log('blog saved!')
    mongoose.connection.close()
  })
}

if(0)
{
  Blog.find({}).then(result => {
    result.forEach(note => {
      console.log(note)
    })
    mongoose.connection.close()
  })
}
