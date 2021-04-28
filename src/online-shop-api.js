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

export function createUser(username, password, is_adm=false) {
    fetch('http://localhost:3001/user/add', {
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
        console.log(data);
        getUsers();
      });
  }
  export function deleteUser(id) {
      fetch(`http://localhost:3001/user-delete/${id}`, {
          method: 'DELETE',
        })
        .then(response => {
            return response.text();
        })
        .then(data => {
            getUsers();
            console.log(data);
        });
    }
    
    export function getProducts() {
      fetch('http://localhost:3001/product/get')
        .then(response => {
          return response.text();
        })
        .then(data => {
          console.log(data)
        });
    }
  
    export function createProduct(product_name, price) {
      fetch('http://localhost:3001/product/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({product_name, price}),
      })
        .then(response => {
          return response.text();
        })
        .then(data => {
          console.log(data);
          getProducts();
        });
    }

    export function deleteProduct(id) {
        fetch(`http://localhost:3001/product-delete/${id}`, {
            method: 'DELETE',
          })
          .then(response => {
              return response.text();
          })
          .then(data => {
            getProducts();
              console.log(data);
          });
      }