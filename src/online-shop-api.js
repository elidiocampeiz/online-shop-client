import React from "react";

export function getUsers() {
    fetch('http://localhost:3001/user/get')
      .then(response => {
        return response.text();
      })
      .then(data => {
        console.log(data)
      });
  }


// TODO ->
export function deleteMerchant(user_id) {
    let id = prompt('Enter merchant id');
    fetch(`http://localhost:3001/user/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getUsers();
      });
  }
export function createUser(username, password, is_adm=false) {
    fetch('http://localhost:3001/create-user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, password, is_adm}),
    })
      .then(response => {
        return response.text();
      })
      .then(data => {
        alert(data);
        getUsers();
      });
  }