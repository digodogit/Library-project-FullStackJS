import React, { useState } from "react";
import './App.css';
import {Form,} from "react-router-dom";


export default function HomePage() {
  const [library, setLibrary] = useState({
    user: '',
    libs:null,
  })
  function handleChange(event)  {
    const {name, value} = event.target;
      setLibrary((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    }); 
  };

  return(
 
    <div className="home-page">      
      <Form method="post" className="form-page">
          <input type="text" 
          name="user" 
          placeholder="usuario..." 
          className="user" 
          onChange={handleChange} 
          value={library.user}
          />
          <button type="submit" className="user-button">Criar biblioteca</button>
      </Form>
    </div>
  )
}



