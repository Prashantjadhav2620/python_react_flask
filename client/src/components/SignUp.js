import React, { useState } from "react";
import { Form, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "bootstrap/dist/css/bootstrap.min.css";

function SignUpPage() {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [show, setShow] = useState(false); // Change this to false
  const [serverResponse, setServerResponse] = useState("");

  const submitForm = (data) => {
    // console.log("data", data);

    if (data.password === data.confirmPassword) {
      const requestOptions = {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          username: data.username,
          email: data.email,
          password: data.password,
        }),
      };

      fetch("/auth/signup", requestOptions)
        .then((response) => response.json())
        .then((data) => {
          console.log("data1", data);
          setServerResponse(data.message);
          setShow(!data.success); // Toggle show based on success
          if (data.success) {
            alert("Registration Successful");
            window.location.href = "/login";
          } else {
            alert("Registration Failed");
          }
        });
      reset();
    } else {
      alert("Passwords do not match");
    }
  };

  return (
    <div className="container">
      <div className="form">
        {show && (
          <>
            <h1>Sign Up Page</h1>
            <Alert variant="success" onClose={() => setShow(false)} dismissible>
              <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
              <p>{serverResponse}</p>
            </Alert>
          </>
        )}
        {!show && <h1>Sign Up Page</h1>}
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
                <small>Username is required</small>
              </p>
            )}
            {(errors.username?.type === "maxLength" && (
              <p style={{ color: "red" }}>
                <small>Max characters should be 30</small>
              </p>
            )) ||
              (errors.username?.type === "minLength" && (
                <p style={{ color: "red" }}>
                  <small>Min characters should be 3</small>
                </p>
              ))}
          </Form.Group>

          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Your Email id "
              {...register("email", { required: true, minLength: 8 })}
            />
            {errors.email && (
              <p style={{ color: "red" }}>
                <small>Email is required</small>
              </p>
            )}
            {errors.email?.type === "minLength" && (
              <p style={{ color: "red" }}>
                {" "}
                <small>Min characters should be 8</small>{" "}
              </p>
            )}
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
                <small>Min characters should be 8</small>{" "}
              </p>
            )}
          </Form.Group>

          <Form.Group>
            <Form.Label>Conform Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="ReEnter Your Password "
              {...register("confirmPassword", {
                required: true,
                minLength: 8,
              })}
            />
            {errors.confirmPassword && (
              <p style={{ color: "red" }}>
                <small>Confirm Password is required</small>
              </p>
            )}

            {errors.confirmPassword?.type === "minLength" && (
              <p style={{ color: "red" }}>
                {" "}
                <small>Min characters should be 8</small>{" "}
              </p>
            )}
          </Form.Group>

          <br></br>
          <Form.Group>
            <Button
              as="sub"
              variant="primary"
              onClick={handleSubmit(submitForm)}
            >
              SignUp
            </Button>
          </Form.Group>
          <br></br>
          <Form.Group>
            <small>
              Allready have an account? <Link to="/login"> Log In</Link> here..!
            </small>
          </Form.Group>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
