import React, {useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Header from './components/Header/component.js'
import Login from './components/Login/component.js'

function App() {
  const [currentUser, setCurrentuser] = useState('USF Student')
  const [selectedPage, setSelectedPage] = useState('Homepage')
  return (
    <div className="app">
      <Header setSelectedPage={setSelectedPage}/>
      <div className="text" >
        <div>
        <h1>COP 4710 - Project 4 - Group 8</h1>
        <h2>Online Shop Web App</h2>
        {selectedPage==='SIGN IN'?
        <Login/>
        : 
        selectedPage
      }
        </div>
      </div>
    </div>
  );
}

export default App;
