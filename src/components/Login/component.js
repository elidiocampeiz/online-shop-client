import React, { useContext, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { createUser, deleteUser, getUsers } from "../../online-shop-api";
import "./styles.css";
import { UserContext, UsersContext } from "../../UserContex";

const Login = ({ setSelectedPage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const onInput = (setValue) => ({ target: { value } }) => setValue(value);
  const { currentUser, setCurrentuser } = useContext(UserContext);
  const { users, setUsers } = useContext(UsersContext);
  const login = async (username, password) => {
    console.log(username, password, users);
    const bool = users instanceof Array;
    const type = typeof users;
    console.log(bool, type);
    // users.forEach(el=>console.log(el))
    const user =
      users?.find((u) => u.username == username && u.password == password) ||
      {};
    console.log(user);
    if (user) {
      setCurrentuser(user);
      alert("You Are logged in");
    } else {
      alert("User not found");
    }
  };
  const deleteAccout = () => {
    deleteUser(currentUser?.user_id);
    setCurrentuser(null);
    alert("Account Deleted");
  };
  return (
    <div className="login-container">
      {currentUser == null ? (
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Email/Username</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              onChange={onInput(setUsername)}
              value={username}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              onChange={onInput(setPassword)}
              value={password}
            />
          </Form.Group>
          <div
            style={{ display: "inline-flex", justifyContent: "space-evenly" }}
          >
            <div style={{ marginRight: 10 }}>
              <Button
                variant="primary"
                onClick={() => createUser(username, password)}
              >
                Register
              </Button>
            </div>
            <div>
              <Button
                variant="primary"
                onClick={() => login(username, password)}
              >
                Login
              </Button>
            </div>
          </div>
        </Form>
      ) : (
        <div>
          <Form>
            <Form.Group>
              <Form.Label>Hello {currentUser?.username}</Form.Label>
            </Form.Group>
            <div
            style={{ display: "inline-flex", justifyContent: "space-evenly" }}
          >
            <div style={{ marginRight: 10 }}>
              <Button variant="primary" onClick={() => setCurrentuser(null)}>
                Logout
              </Button>
            </div>
            <div style={{ marginRight: 10 }}>
              <Button variant="primary" onClick={deleteAccout}>
                Delete Account
              </Button>
            </div>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
};

export default Login;
