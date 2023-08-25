import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

function SignUpPage() {
  const {
    register,
    watch,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitForm = (data) => {
    console.log("data", data);
    reset();
  };

  console.log(watch("username"));
  console.log(watch("email"));
  console.log(watch("password"));
  console.log(watch("confirmPassword"));

  return (
    <div className="container">
      <div className="form">
        <h1>Sign Up Page</h1>
        <form>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Your UserName"
              {...register("username", { required: true, maxLength: 30 , minLength:3})}
            />
            {errors.username && (
              <span style={{ color: "red" }}>
                Username is required <br></br>{" "}
              </span>
            )}
            {errors.username?.type == "maxLength" && (
              <span style={{ color: "red" }}>
                {" "}
                Max characters should be 30{" "} 
              </span> 
            ) || errors.username?.type == "minLength" && (
              <span style={{ color: "red" }}>
                {" "}
                Min characters should be 3 {" "} 
              </span> 
            )  }
          </Form.Group>
          <br></br>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter Your Email id "
              {...register("email", { required: true, minLength: 8 })}
            />
            {errors.email && (
              <span style={{ color: "red" }}>
                Email is required <br></br>{" "}
              </span>
            )}
            {errors.email?.type == "minLength" && (
              <span style={{ color: "red" }}> Min characters should be 8  </span>
            )}
          </Form.Group>
          <br></br>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter Your Password "
              {...register("password", { required: true, minLength: 8 })}
            />
            {errors.password && (
              <span style={{ color: "red" }}>
                Password is required <br></br>
              </span>
            )}
            {errors.password?.type == "minLength" && (
              <span style={{ color: "red" }}> Min characters should be 8 </span>
            )}
          </Form.Group>
          <br></br>
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
              <span style={{ color: "red" }}>
                Confirm Password is required <br></br>
              </span>
            )}

            {errors.confirmPassword?.type == "minLength" && (
              <span style={{ color: "red" }}> Min characters should be 8 </span>
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
