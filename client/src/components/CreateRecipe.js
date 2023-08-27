import React from 'react'
import {Form , Button} from 'react-bootstrap'
import {useForm} from 'react-hook-form'

function CreateRecipePage() {

  const {register ,handleSubmit , reset , formState:{errors}}= useForm()

  const createRecipe =(data)=>{
    console.log(data)
    
    const token=localStorage.getItem('REACT_TOKEN_AUTH_KEY');
    console.log(token)

    const requestOptions = {  
      method: "POST",
      headers:{
        'content-type':'application/json', 
        'Authorization':`Bearer ${JSON.parse(token)}` 
      },
      body:JSON.stringify(data)
    }

    fetch("/recipe/recipes" , requestOptions)
    .then((response) => response.json())
    .then((data) => {
      reset()
    })
    .catch((error) => console.log("error", error)); 
  }

  return (
    <div className='container'>
        <h1>Create a Recipe </h1>
        <Form>
            <Form.Group>
                <Form.Label>Recipe Name</Form.Label>
                <Form.Control type='text' placeholder='Enter Recipe Name'
                {...register('title',{required:true , maxLength:30 , minLength:3})} 
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
                <Form.Control as='textarea' rows={5}  placeholder='Enter Description'
                {...register('description',{required:true , maxLength:255 , minLength:3})} 
                
                />
                 {errors.description && (
              <p style={{ color: "red" }}>
                <small>Description is required</small>
              </p>
            )}
            {(errors.description?.type === "maxLength" && (
              <p style={{ color: "red" }}>
                <small> Description should be maximum 255 characters long </small>
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
                 <Button  variant='primary' onClick={handleSubmit(createRecipe)}>Save</Button>
            </Form.Group>
        </Form>
    </div>
  )
}

export default CreateRecipePage
