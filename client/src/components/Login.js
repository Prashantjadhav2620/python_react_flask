import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login } from "../auth";
// import { useHistory } from "react-router-dom";

import { useNavigate } from "react-router-dom";

function LoginPage() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const loginUser = (data) => {
    console.log("Login Form Submited");
    console.log(data);

    const requestOptions = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data)

    };

    fetch("/auth/login", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        console.log("======session.access_token",data.access_token)
        login(data.access_token)
        navigate("/")
      });

    reset();
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
              {...register("username", {
                required: true,
                maxLength: 30,
                minLength: 3,
              })}
            />
            {errors.username && (
              <p style={{ color: "red" }}>
                <small> Username is required</small>
              </p>
            )}
            {(errors.username?.type === "maxLength" && (
              <p style={{ color: "red" }}>
                <small>Max characters should be 30</small>
              </p>
            )) ||
              (errors.username?.type === "minLength" && (
                <p style={{ color: "red" }}>
                  <small> Username should be minimum 3 characters</small>
                </p>
              ))}
          </Form.Group>

          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Your Password "
              {...register("password", { required: true, minLength: 8 })}
            />
            {errors.password && (
              <p style={{ color: "red" }}>
                <small>Password is required</small>
              </p>
            )}
            {errors.password?.type === "minLength" && (
              <p style={{ color: "red" }}>
                {" "}
                <small>Password length should be minimum 8</small>{" "}
              </p>
            )}
          </Form.Group>
          <br></br>
          <Form.Group>
            <Button
              as="sub"
              variant="primary"
              onClick={handleSubmit(loginUser)}
            >
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
