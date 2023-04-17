// Import required modules
import colors from './colors.json' assert { type: "json" };
import express from "express"
import body_parser from "body-parser"
import path from 'path';

let colours = [...colors]

// Create an instance of Express app
const app = express();

// Configure middleware
const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.get('/', (req, res) => {
  res.send('Colour Library');
});

//List all Colours
app.get('/colours', (req, res) => {
  res.send(colours);
});

//Select a Colour with specific ColorId
app.get('/colours/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const color = colours.find((color) => color.colorId === id);
  res.send(colors);
});

//Create a new color
app.post('/colours', (req, res) => {
  const hexString = req.body.hexString;
  const rgb = req.body.rgb;
  const hsl = req.body.hsl;
  const name = req.body.name;
  const colorId = books.length + 1;
  books.push({ colorId: colorId, hexString: hexString, rgb: rgb, hsl: hsl, name:name });
  res.send('Colour Created');
});

//Edit an existing color
app.post('/colours/:id/edit', (req, res) => {
  const id = parseInt(req.params.id);
  const color = colours.find((color) => color.colorId === id);
  color.hexString = req.body.hexString;
  color.rgb = req.body.rgb;
  color.hsl = req.body.hsl;
  color.name = req.body.name;
  res.send('Colours Updated');
});

//Delete an existing Colour
app.get('/colours/:id/delete', (req, res) => {
  const id = parseInt(req.params.id);
  colours = colours.filter((colours) => colours.colorId !== id);
  res.send('Colour Deleted');
});

// Configure template engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Start the server
app.listen(3030, () => {
  console.log('Server listening on port 3030');
});

