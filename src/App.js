import { useState } from 'react';
import './App.css';
import Chatbox from './components/Chatbox';

function App() {
  const [active, setActive] = useState(false);
  return (
    <div className="App">
      <header className="App-header">
      {active?
    <Chatbox setActive={setActive}/>:null}
        <div> 
          <img src='/assets/chat-icon.svg' alt='' className='widget-icon' onClick={()=>{
            setActive(!active)
          }}></img>
        </div>
      </header>
    </div>
  );
}

export default App;
