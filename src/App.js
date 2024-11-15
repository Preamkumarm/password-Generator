import './App.css';
import {useState} from "react";
import usePasswordGenerator from './Usepasswordgenerator';

function App() {

  const [length,setLength] = useState(4)

  const [checkboxData,setcheckboxData]=useState([
    { title:"Include Uppercase Letters", state: false},
    { title:"Include Lowercase Letters", state: false},
    { title:"Include Numbers", state: false},
    { title:"Include Symbols", state: false},

  ]);

  const [copied,setCopied] = useState(false);

  const handleCheckbox = (i)=>{
    const updatedCheckboxData = [...checkboxData]
   updatedCheckboxData[i].state = !updatedCheckboxData[i].state;
   setcheckboxData(updatedCheckboxData);
  }  

  const handlecopy = ()=>{
    navigator.clipboard.writeText(password);
    setCopied(true);

    setTimeout(()=>{
    setCopied(false);
    }, 1000);
  }

  const {password, errorMessage, generatePassword} = usePasswordGenerator();  
    return (<div className="container">
    {/* {Password Text and Copy} */}
    { password && (<div className="header">
      <div className="title">{password}</div>
      <button className="copyBtn" onClick={()=> handlecopy()}>{copied?"copied":"copy"}</button>
    </div> )}
    {/* { Character Length } */}

    <div className="charlength">
      <span>
      <label>Character Length</label>
      <label>{length}</label>
      </span>

      <input
      type="range"
      min="4"
      max="20"
      value={length}
      onChange={(e)=> setLength(e.target.value)}
      />
    </div>
    {/* {Checkboxes} */}

    <div className="checkboxes">
      {
        checkboxData.map((item,index)=>{
          return <div key={index}>
            <input type="checkbox" checked={item.state} onChange={() =>handleCheckbox(index)}/>
            <label>{item.title}</label>
          </div>
        })
      }
    </div>

    {/* {Strength} */}

    {/* {Error Handling} */}
    {errorMessage && <div className="errorMessage">{errorMessage}</div>}
    {/* {Generate Button} */}

    <button className="generateBtn" onClick={()=> generatePassword(checkboxData, length)}>Generate Password</button>
  </div>)
}

export default App;
