import React, { useContext, useState,useEffect } from "react";
import { Form, Button, ListGroup,FormLabel, Card, FormControl } from "react-bootstrap";
import { createUser, deleteUser, getUsers, loginUser} from "../../online-shop-api";
import "./styles.css";
import { UserContext, UsersContext } from "../../contexts";

const Login = ({ setSelectedPage }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdm, setIsAdm] = useState(false);
  const onInput = (setValue) => ({ target: { value } }) => setValue(value);
  const onCheckInput = (setValue) => ({ target: { checked } }) => setValue(checked);
  const { currentUser, setCurrentuser } = useContext(UserContext);
  const { users, setUsers } = useContext(UsersContext);
  const [usersList, setUsersList] = useState(users);
  const clear = () => {
    setUsername('');
    setPassword('');
    setIsAdm(false);
  }
  const login = async (username, password) => {
    if(username==''|| password==''){
      alert("Invalid Username or Password") 
      return
    }
    const user = await loginUser(username, password);
    if (user) {
      alert("You Are logged in");
    } else {
      alert("User not found");
    }
    setCurrentuser(user);
    // clear();
  };

  const deleteAccout = (id) => {
    deleteUser(id);
    if (id==currentUser.user_id){
      setCurrentuser(null)
    } else{
      const nUserList = usersList.filter(user=>user.user_id!=id);
      setUsersList(nUserList);
    }
    alert("Account deleted") 
  };

  const registration = async (username, password, isAdm=false) => {
    if(username==''|| password==''){
      alert("Invalid Username or Password") 
      return
    }
    if(users.find((u) => u.username === username )){
      alert("Username already exists") 
      return
    }
    const user = await createUser(username, password, isAdm);
    
    
    if (user) {
      const newUsers = await getUsers();
      setUsers(newUsers);
      if(!currentUser){
        setCurrentuser(user);
        alert("New Account Created. You Are logged in");
      }
      else{
        const nUserList = newUsers.filter((u) => u.user_id != currentUser.user_id);
        setUsersList(nUserList);
        alert("New Account Created");
      }
    } else {
      alert("Fail to Create Account");
    }
    clear();
  }
  const search = (event) => {
    if (event.target.value != null) {
      const newP = users.filter((user) =>
      user.username
      ?.toLowerCase()
      .includes(event?.target?.value?.toLowerCase())
      );
      setUsersList(newP);
    } else {
      setUsersList(users);
    }
  };
  useEffect(() => {
    async function getUsersData() {
      if (!currentUser || !currentUser.is_adm){
        return 
      }
      else{

        try {
          const data = await getUsers();
          const userListData = data.filter(u => u.user_id!==currentUser.user_id);
          setUsersList(userListData);
        } catch (err) {
          console.log(err);
        }
      }
    }
    getUsersData();
    clear();
  }, [currentUser])
  return (
    <div
      className="login-container"
      style={{
        width: "100%",
        justifyContent: "center",
        display: "flex",
        alignSelf: "center",
      }}
    >
      {!currentUser || currentUser.is_adm ? (
        <Form>
          <Form.Group controlId="formBasicEmail">
          {currentUser&&<Form.Label>Hi {currentUser.username}</Form.Label>&&<Form.Label>Register New Users as an Adm</Form.Label>}
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
          {currentUser && currentUser.is_adm && (
            <Form.Group controlId="formBasicCheckbox">
              <Form.Check
                type="checkbox"
                label="Create another Adm User?"
                onChange={onCheckInput(setIsAdm)}
                value={isAdm}
              />
            </Form.Group>
          )}
          <div
            style={{ display: "inline-flex", justifyContent: "space-evenly" }}
          >
            <div style={{ marginRight: 10 }}>
              <Button
                variant="primary"
                onClick={() => registration(username, password, isAdm)}
              >
                Register
              </Button>
            </div>
            {!currentUser ?(
              <div>
                <Button
                  variant="primary"
                  onClick={() => login(username, password)}
                >
                  Login
                </Button>
              </div>
            ):(
            <div style={{ marginRight: 10 }}>
              <Button variant="primary" onClick={() => setCurrentuser(null)}>
                Logout
              </Button>
            </div>
            )}
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
                <Button variant="primary" onClick={() => deleteAccout(currentUser.user_id)}>
                  Delete Account
                </Button>
              </div>
            </div>
          </Form>
        </div>
      )}
      {currentUser && currentUser.is_adm &&(
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Card
                style={{
                  flex: 1,
                  margin: "5px",
                  padding: "5px",
                  height: "400px",
                  width:'350px',
                }}
              >
                <Card.Title>Manage user accounts</Card.Title>
                
                <FormControl
                  placeholder="Type to Search"
                  onChange={search}
                  style={{ marginBottom: "5px" }}
                />
                <ListGroup
                  style={{
                    overflowY: "scroll",
                  }}
                >
                  {usersList?.map((user) => (
                    <ListGroup.Item key={user?.user_id}>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          padding: "0px 5px",
                        }}
                      >
                        <div>{user.username}</div>
                        <div>
                          <button onClick={() => deleteAccout(user.user_id)}
                            
                          >
                            Delete User
                          </button>
                        </div>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </Card>
            </div>
          )}
    </div>
  );
};

export default Login;
