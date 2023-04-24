// Import required modules
import colors from './colors.json' assert { type: "json" };
import express from "express"
import body_parser from "body-parser"
import path from 'path';
import cors from "cors"
import cookieParser from 'cookie-parser';

let colours = [...colors]

// Create an instance of Express app
const app = express();
app.use(body_parser.json());
app.use(cors());
app.use(cookieParser());

// Configure middleware
const __dirname = path.dirname(new URL(import.meta.url).pathname);
app.use(express.static(path.join(__dirname, 'public')));

// Define routes
app.get('/', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.send('Colour Library');
});

//List all Colours
app.get('/colours', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.send(colours);
});

//Select a Colour with specific ColorId
app.get('/colours/:id', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  const id = parseInt(req.params.id);
  const colors = colours.find((colours) => colours.colorId === id);
  res.send(colors);
});

//Create a new color
app.post('/colours', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  const hexString = req.body.hexString;
  const rgb = req.body.rgb;
  const hsl = req.body.hsl;
  const name = req.body.name;
  const colorId = colours.length > 0 ? colours[colours.length - 1].colorId + 1 : 0;
  colours.push({ colorId: colorId, hexString: hexString, rgb: rgb, hsl: hsl, name:name });
  console.log(req.body.colorId);
  res.send({"created":`http://localhost:3030/colours/${colorId}`});
});

//Edit an existing color
app.post('/colours/:id/edit', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  const id = parseInt(req.params.id);
  const newResource = id;
  const color = colours.find((color) => color.colorId === id);
  const hexString = req.body.hexString;
  const rgb = req.body.rgb;
  const hsl = req.body.hsl;
  const name = req.body.name;
  if(color == null){
    const colorId = colours.length > 0 ? colours[colours.length - 1].colorId + 1 : 0;
    newResource = colorId;
    colours.push({ colorId: colorId, hexString: hexString, rgb: rgb, hsl: hsl, name:name });
  }else{
    color.hexString = hexString;
    color.rgb = rgb;
    color.hsl = hsl;
    color.name = name;
  }
  res.send({"edited":`http://localhost:3030/colours/${newResource}`});
});

//Delete an existing Colour
app.get('/colours/:id/delete', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  const id = parseInt(req.params.id);
  const color = colours.find((color) => color.colorId === id);
  if(color){
    colours = colours.filter((colours) => colours.colorId !== id);
    res.send({"deleted":`Colour of id ${id} Successfully removed.`});
  }else{
    res.send({"deleted":`Colour of id ${id} Does not exists.`});
  }
});

// Configure template engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Start the server
app.listen(3030, () => {
  console.log('Server listening on port 3030');
});

