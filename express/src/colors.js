// Import required modules
import colors from './colors.json';
const express = require('express');
const bodyParser = require('body-parser');

// Create an instance of Express app
const app = express();

// Configure middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

// Define some sample book data
let colors = [
  {
    id: 1,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    year: 1960
  },
  {
    id: 2,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    year: 1925
  },
  {
    id: 3,
    title: '1984',
    author: 'George Orwell',
    year: 1949
  }
];

// Define routes
app.get('/', (req, res) => {
  res.send('Welcome to the library!');
});

app.get('/books', (req, res) => {
  res.render('books', { books: books });
});

app.get('/books/new', (req, res) => {
  res.render('new-book');
});

app.post('/books', (req, res) => {
  const title = req.body.title;
  const author = req.body.author;
  const year = req.body.year;
  const id = books.length + 1;
  books.push({ id: id, title: title, author: author, year: year });
  res.redirect('/books');
});

app.get('/books/:id/edit', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find((book) => book.id === id);
  res.render('edit-book', { book: book });
});

app.post('/books/:id/edit', (req, res) => {
  const id = parseInt(req.params.id);
  const book = books.find((book) => book.id === id);
  book.title = req.body.title;
  book.author = req.body.author;
  book.year = req.body.year;
  res.redirect('/books');
});

app.get('/books/:id/delete', (req, res) => {
  const id = parseInt(req.params.id);
  books = books.filter((book) => book.id !== id);
  res.redirect('/books');
});

// Configure template engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Start the server
app.listen(3030, () => {
  console.log('Server listening on port 3030');
});

