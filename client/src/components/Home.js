import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth";
import Recipe from "./Recipe";
import { Modal ,Form ,Button} from "react-bootstrap";
import {useForm} from "react-hook-form";

const LoggedinHome = () => {
  const [recipes, setRecipes] = useState([]);
  const {register ,handleSubmit , reset,setValue , formState:{errors}}= useForm()
  const [show, setShow] = useState(false);
  const [recipeId , setRecipeId] = useState(0)

  useEffect(() => {
    fetch("/recipe/recipes")
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((err) => console.log(err));
  });

  const getAllRecipes= (() => {
    fetch("/recipe/recipes")
      .then((res) => res.json())
      .then((data) => setRecipes(data))
      .catch((err) => console.log(err));
  });

  // 

  const closeModel = () => {
    setShow(false);
  };
  const showModal = (id) => {
    setShow(true);
    setRecipeId(id)
    recipes.map(
        (recipe)=>{
          if(recipe.id===id){
            setValue('title',recipe.title)
            setValue('description',recipe.description)
          }})


  };

  const token = localStorage.getItem("REACT_TOKEN_AUTH_KEY");
  const updateRecipe = (data)=>{
    
    const requestOptions = {
      method:"PUT",
      headers:{
        'content-type':'application/json', 
        'Authorization':`Bearer ${JSON.parse(token)}` 
      },
      body:JSON.stringify(data)
    }

    fetch(`/recipe/recipes/${recipeId}` , requestOptions)
    .then((response) => response.json())
    .then((data) => {
      const reload=window.location.reload()
      reload()
    })
    .catch((error) => console.log("error", error)); 

  }

  const deleteRecipe =(id)=>{
      console.log(id)

      const requestOptions = {
        method:"DELETE",
        headers:{
          'content-type':'application/json', 
          'Authorization':`Bearer ${JSON.parse(token)}` 
        }
      }
  
      fetch(`/recipe/recipes/${id}` , requestOptions)
      .then((response) => response.json())
      .then((data) => {
        getAllRecipes()
        const reload=window.location.reload()
        reload()
      })
      .catch((error) => console.log("error", error)); 
  }

  return (
    <div className="recipes container">
      <Modal show={show} size="lg" onHide={closeModel}>
        <Modal.Header closeButton>
          <Modal.Title>Update Recipe</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Recipe Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Recipe Name"
                {...register("title", {
                  required: true,
                  maxLength: 30,
                  minLength: 3,
                })}
              />
              {errors.title && (
                <p style={{ color: "red" }}>
                  <small>Title is required</small>
                </p>
              )}
              {(errors.title?.type === "maxLength" && (
                <p style={{ color: "red" }}>
                  <small>Title should be maximum 30 characters long </small>
                </p>
              )) ||
                (errors.title?.type === "minLength" && (
                  <p style={{ color: "red" }}>
                    <small>Title should be minimum 3 characters </small>
                  </p>
                ))}
            </Form.Group>
            <br></br>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={5}
                placeholder="Enter Description"
                {...register("description", {
                  required: true,
                  maxLength: 255,
                  minLength: 3,
                })}
              />
              {errors.description && (
                <p style={{ color: "red" }}>
                  <small>Description is required</small>
                </p>
              )}
              {(errors.description?.type === "maxLength" && (
                <p style={{ color: "red" }}>
                  <small>
                    {" "}
                    Description should be maximum 255 characters long{" "}
                  </small>
                </p>
              )) ||
                (errors.description?.type === "minLength" && (
                  <p style={{ color: "red" }}>
                    <small>Description should be minimum 3 characters</small>
                  </p>
                ))}
            </Form.Group>
            <br></br>
            <Form.Group>
              <Button variant="primary" onClick={handleSubmit(updateRecipe)}>
                Save
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
      <h1 className="listofrecipes">List of Recipes</h1>
      {recipes.map((recipe,index) => (
        <Recipe
          key={index}
          title={recipe.title}
          description={recipe.description}
          onClick={()=>{showModal(recipe.id)}}

          onDelete={()=>{deleteRecipe(recipe.id)}}
        />
      ))}
    </div>
  );
};

const LoggedOutHome = () => {
  return (
    <div className="home container">
      <h1 className="heading">Welcome to the Recipes</h1>
      <Link to="/signup" className="btn btn-primary btn-lg">
        Get Started
      </Link>
    </div>
  );
};

function HomePage() {
  const [logged] = useAuth();
  return <div>{logged ? <LoggedinHome /> : <LoggedOutHome />}</div>;
}

export default HomePage;
