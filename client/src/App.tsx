import React from 'react'
import logo from './logo.svg'
import './App.css'

function App() {

  const sendMessage = async () => {
    const obj = {
      Name: 'Carl', LastName: 'Dahlqvist'
    }
    const user = JSON.stringify(obj);
    const response = await fetch('http://localhost:3000/message', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: user })
    });
    if (!response.ok) {
        throw new Error('Could not send message')
    }
}
const sendMessage2 = async () => {
  const response = await fetch('http://localhost:3000/dentist', {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: 'This message is now diffrent' })
  });
  if (!response.ok) {
      throw new Error('Could not send message')
  }
}
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div>
        <button onClick={sendMessage}>Send message</button>
      </div>
      <div>
        <button onClick={sendMessage2}>Send message 2</button>
      </div>
    </div>
  )
}

export default App
