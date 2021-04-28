import React, { useState } from "react";
import { Form, Button} from 'react-bootstrap';
import {createUser, deleteUser, createProduct, deleteProduct } from '../../online-shop-api'
import "./styles.css";

const Login = ({ setSelectedPage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const onInput = (setValue) => ({target:{value}}) => setValue(value);
  const [currentUser, setCurrentuser] = useState("");
  const signOut = () => console.log("signOut");
  // deleteUser(5);
  // createProduct();
  // deleteProduct(5)
  return (
    <div className="login-container">
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email/Username</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={onInput(setUsername)} value={username}/>
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={onInput(setPassword)} value={password}/>
        </Form.Group>
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={ () => createUser(username, password)}>
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Login;
