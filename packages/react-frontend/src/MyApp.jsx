// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";


function MyApp() {
    const [characters, setCharacters] = useState(() =>{
      const savedCharacters = localStorage.getItem("characters");
      return savedCharacters ? JSON.parse(savedCharacters) : [];
    });

    useEffect(() => {
      localStorage.setItem("characters", JSON.stringify(characters));

    }, [characters]
  );
    function updateList(person) {
        setCharacters([...characters, person]);
      }

    function removeOneCharacter(index) {
        const updated = characters.filter((character, i) => {
          return i !== index;
        });
        setCharacters(updated);
      }
    
      return (
        
        <div className="container">
          <Table
            characterData={characters}
            removeCharacter={removeOneCharacter}
          />

          <Form handleSubmit={updateList}/>
        </div>
      );
  }
export default MyApp;