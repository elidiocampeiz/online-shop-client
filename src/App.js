import React, {useEffect, useMemo, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import Header from './components/Header/component.js'
import Login from './components/Login/component.js'
import Homepage from './components/homepage/component.js'
import {getUsers} from './online-shop-api';
import {UserContext, UsersContext} from './UserContex';

function App() {
  const [currentUser, setCurrentuser] = useState(null)
  const [users, setUsers] = useState([])
  const [selectedPage, setSelectedPage] = useState('Homepage')
  const userPoviderValue = useMemo(()=>({currentUser, setCurrentuser}), [currentUser, setCurrentuser])
  const usersPoviderValue = useMemo(()=>({users, setUsers}), [users, setUsers])

  useEffect( ()=>{
    // async function getData (){
    //   try {
    //   const data = getUsers();
    //   setUsers(data);
    // } catch (err){
    //   console.log(err);
    // }
    // }
    fetch("http://localhost:3001/user/get")
      .then((res) => {
        return res.json();
      })
      .then((data) => setUsers(data));
  }, [])

  return (
    <div className="app">
      <Header />

      <UsersContext.Provider value={usersPoviderValue}>
        <UserContext.Provider value={userPoviderValue}>
          <Switch>
          <Route path="/" exact component={Homepage} />

          <Route path="/signin" component={Login} />
          <Route path="/*" component={Homepage} />
          </Switch>
          {/* {selectedPage === "SIGN IN" ? <Login /> : selectedPage} */}
        </UserContext.Provider>
      </UsersContext.Provider>
    </div>
  );
}

export default App;
