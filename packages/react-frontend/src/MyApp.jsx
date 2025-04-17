// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";


function MyApp() {


  const [characters, setCharacters] = useState([]);

      function fetchUsers() {
        const promise = fetch("Http://localhost:8000/users");
        return promise;
    }

    useEffect(() => {
      fetchUsers()
        .then((res) => res.json())
        .then((json) => setCharacters(json["users_list"]))
        .catch((error) => { console.log(error); });
    }, [] );


    function postUser(person) {
      const promise = fetch("Http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(person),
      });
  
      return promise;
    }

    function updateList(person) {
      postUser(person)
        .then((response) => {
          if (response.status === 201) {
            return response.json();
          } else {
            console.log("User not created smh bum");
          }
        })
        .then((newUser) => setCharacters([...characters, newUser]))
        .catch((error) => console.log(error));
    }

  //I just added the if res just cuz it seems like thats whats needed in the spec idk tho tbh theres a funny thingy in here
  function removeOneCharacter(id){
    fetch(`Http://localhost:8000/users/${id}`, {
      method: 'Delete',})
      .then((res) => {
        if (res.status === 204){
        const updated = characters.filter((character) => character.id !== id);

        setCharacters(updated);
      }else{
        console.log("OMG JENNA YOU CANT DO THAT !!!!")
      }
      }
    );    

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