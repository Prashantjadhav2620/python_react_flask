import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const loginUser = () => {
    console.log("Login Form Submited");
    console.log("username", username);
    console.log("password", password);

    setUsername("");
    setPassword("");
  };

  return (
    <div className="container">
      <div className="form">
        <h1>Login Page</h1>
        <form>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Your UserName"
              value={username}
              name="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <br></br>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Your Password "
              value={password}
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <br></br>
          <Form.Group>
            <Button as="sub" variant="primary" onClick={loginUser}>
              Login
            </Button>
          </Form.Group>
          <br></br>
          <Form.Group>
            <small>
              Don't have an account?{" "}
              <Link to="/signup"> Sign Up or Create One</Link> here..!
            </small>
          </Form.Group>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
