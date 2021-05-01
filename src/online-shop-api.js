import React from "react";



export async function getUsers() {
  const res = await fetch("http://localhost:3001/user/get")
  const data = await res.json();
  return data;
}


export async function createUser(username, password, is_adm=false) {
  const res = await fetch('http://localhost:3001/user/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({username, password, is_adm}),
    });
    const data = res.text();
    return data;
  }
  export async function deleteUser(id) {
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
    export async function getProducts() {
      const res = await fetch('http://localhost:3001/product/get');
      const data = await res.json();
      return data;
    }
    
  
    export async function createProduct(product_name, price) {
      const res = await fetch('http://localhost:3001/product/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({product_name, price}),
      });
      const data = res.text();
      return data;
    }

    export async function deleteProduct(id) {
      fetch(`http://localhost:3001/product-delete/${id}`, {
        method: "DELETE",
      })
        .then((response) => {
          return response.text();
        })
        .then((data) => {
          console.log(data);
        });
    }