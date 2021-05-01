
export async function getUsers() {
  const res = await fetch("http://localhost:3001/user/get")
  const data = await res.json();
  return data;
}


export async function createUser(username, password, is_adm=true) {
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

  export async function getOrders() {
  const res = await fetch("http://localhost:3001/order/get")
  const data = await res.json();
  return data;
}

export async function createOrder(uID, value, date_of_order=Date.now()) {
  const res = await fetch('http://localhost:3001/order/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({uID, value, date_of_order}),
    });
    const data = res.text();
    return data;
  }

  export async function deleteOrder(id) {
    fetch(`http://localhost:3001/order-delete/${id}`, {
        method: 'DELETE',
      })
      .then(response => {
          return response.text();
      })
      .then(data => {
          getOrders();
          console.log(data);
      });
  }

  export async function getSales() {
    const res = await fetch("http://localhost:3001/sales/get")
    const data = await res.json();
    return data;
  }

  export async function createSale(orderID, productID, product_count, date_of_sale) {
    const res = await fetch('http://localhost:3001/sale/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({orderID, productID, product_count, date_of_sale}),
      });
      const data = res.text();
      return data;
    }

    export async function getOrdersPerUser(uID) {
      const res = await fetch('http://localhost:3001/order/get-history', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({uID}),
        });
        const data = await res.json();
        return data;
      }

      export async function getSalesPerProduct() {
        const res = await fetch("http://localhost:3001/sales/get-product")
        const data = await res.json();
        return data;
      }