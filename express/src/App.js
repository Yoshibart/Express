import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/fontawesome-free-solid'
function App() {

  return (
    <>
      <div id="option_buttons">
        <button>Show Color</button><br/>
        <button>Insert Color</button><br/>
        <button>Remove Color</button><br/>
        <button>Modify Color</button><br/>
        <button>Select Background</button><br/>
      </div>
      <div id="inputs-section">
        <div id="input">
          <p>
            <label>ColorId:</label>
            <input name="ColorId" required />
          </p>
          <p>
            <label>HexString:</label>
            <input name="HexString" required />     
          </p>
          <p>
            <label>RGB:</label>
            <input name="RGB" required />
          </p>
          <p>
            <label>HSL:</label>
            <input name="HSL" required />
          </p>
          <p>
            <label>Name:</label>
            <input name="Name" required />       
          </p>
          <p>
            <button><FontAwesomeIcon icon={faAngleLeft} /></button>
            <button><FontAwesomeIcon icon={faAngleRight} /></button>
          </p>
        </div>
        <div  id="display" >
          <label>Display Color:</label>
          <p style={{width: "200px", height:"200px",backgroundColor:"red"}}></p>    
        </div>
      </div>
    </>
  );
}
export default App;
