import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/fontawesome-free-solid'
import { useState, useEffect} from 'react';

export default function App() {
  const [allColors, setAllColors] = useState([]);
  const [color, setColor] = useState({colorId:"",hexString:"",rgb:"",hsl:"",name:""});

  useEffect(() => {
    fetch(`http://localhost:3030/colours/`).then(response => response.json())
    .then(datas => {
      setAllColors(datas);
    });    
  }, [color]);

  const setColorInputs = event =>{
    setColor(oldata =>{return {...oldata,[event.target.name]:event.target.value}})}

  const deleteColor = () => {
    fetch(`http://localhost:3030/colours/${color.colorId}/delete`).then(response => response.json())
    .then(data => {
      console.log(data.deleted)
    });
    nextColor();
  }

  const previousColor = () => {
    let data;
    if(color.colorId == allColors[0].colorId){
      data = allColors[allColors.length-1];
    }else{
      for(let colors of allColors){
        if(colors.colorId === color.colorId) break;
        data = colors
      }
    }
    const { r, g, b } = data.rgb;
    const h = Number(data.hsl.h) > 0 ? `${data.hsl.h}%` : data.hsl.h;
    const s = Number(data.hsl.s) > 0 ? `${data.hsl.s}%` : data.hsl.s;
    const l = Number(data.hsl.l) > 0 ? `${data.hsl.l}%` : data.hsl.l;
    data.rgb = `rgb(${r},${g},${b})`;
    data.hsl = `hsl(${h},${s},${l})`;
    setColor(data);
  };

  const nextColor = () => {
    let data;
    if(color.colorId == allColors[allColors.length-1].colorId){
      data = allColors[0];
    }else{
      for(let colors = allColors.length-1; colors > -1; colors--){
        if(allColors[colors].colorId === color.colorId) break;
        data = allColors[colors];
      }
    }
      const { r, g, b } = data.rgb;
      const h = Number(data.hsl.h) > 0 ? `${data.hsl.h}%` : data.hsl.h;
      const s = Number(data.hsl.s) > 0 ? `${data.hsl.s}%` : data.hsl.s;
      const l = Number(data.hsl.l) > 0 ? `${data.hsl.l}%` : data.hsl.l;
      data.rgb = `rgb(${r},${g},${b})`;
      data.hsl = `hsl(${h},${s},${l})`;
      setColor(data);
  }

  const showColor = ()=>{
    let showButtonSelection = document.getElementById("show");
    showButtonSelection.hidden = !showButtonSelection.hidden;
  }

  const extract = (rgbString)=>{
    const rgbValues = rgbString.match(/\d+/g).map(Number);
    const [r, g, b] = rgbValues;
    return [r,g,b];
  }

  const modifyColor = () => {
    let [r, g, b] = extract(color['rgb']);
    color.rgb = {'r':r, 'g':g, 'b':b}
    let {h, s, l} = extract(color['hsl']);
    color.hsl = {'h':r, 's':g, 'l':b}

    fetch(`http://localhost:3030/colours/${color.colorId}/edit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(color)
    }).then(data => {
      console.log(data.edited);
    });
  };

  const insertColor = () => {
    let [r, g, b] = extract(color['rgb']);
    color.rgb = {'r':r, 'g':g, 'b':b}
    let {h, s, l} = extract(color['hsl']);
    color.hsl = {'h':r, 's':g, 'l':b}

    fetch(`http://localhost:3030/colours`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(color)
    }).then(data => {
      console.log(data.edited);
    });
  };


  return (
    <>
      <div id="option_buttons">
        <button onClick={showColor}>Show Color</button><br/>
        <button onClick={insertColor}>Insert Color</button><br/>
        <button onClick={deleteColor}>Remove Color</button><br/>
        <button onClick={modifyColor}>Modify Color</button><br/>
        <button >Select Background</button><br/>
      </div>
      <div id="inputs-section">
        <div id="input">
          <p>
            <label>ColorId:</label>
            <input name="colorId" required onChange={setColorInputs} value={color.colorId}/>
          </p>
          <p>
            <label>HexString:</label>
            <input name="hexString" required onChange={setColorInputs} value={color.hexString}/>     
          </p>
          <p>
            <label>RGB:</label>
            <input name="rgb" required onChange={setColorInputs}value={color.rgb}/>
          </p>
          <p>
            <label>HSL:</label>
            <input name="hsl" required onChange={setColorInputs} value={color.hsl}/>
          </p>
          <p>
            <label>Name:</label>
            <input name="name" required onChange={setColorInputs} value={color.name}/>       
          </p>
          <p>
            <button onClick={previousColor}><FontAwesomeIcon icon={faAngleLeft} /></button>
            <label>{color.colorId}</label>
            <button onClick={nextColor}><FontAwesomeIcon icon={faAngleRight} /></button>
          </p>
        </div>
        <div id="display" >
          <label>Display Color:</label>
          <p id="show" style={{width: "200px", height:"200px",backgroundColor:color.hexString}} hidden></p>    
        </div>
      </div>
    </>
  );
}
