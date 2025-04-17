// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Jenna",
      job: "The best grader Of All Time"
    },
    {
      id: "abc123",
      name: "Leila",
      job: "Bully"
    },
    {
      id: "ppp222",
      name: "Khris From Zone C",
      job: "The goat"
    },
    {
      id: "yat999",
      name: "Charlotte",
      job: "Bum"
    },
    {
      id: "zap555",
      name: "Gwenie da Pooh",
      job: "Rose Float"
    }
  ]
};

app.get("/", (req, res) => {
  res.send("Hello world!");
});

const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};

app.get("/users", (req, res) => {
  const name = req.query.name;
  if (name != undefined) {
    let result = findUserByName(name);
    result = { users_list: result };
    res.send(result);
  } else {
    res.send(users);
  }
});



const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

app.get("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = findUserById(id);
  if (result === undefined) {
    res.status(404).send("Resource not found.");
  } else {
    res.send(result);
  }
});


const addUser = (user) => {
  user.id = Math.floor(Math.random() *1000).toString()
  users["users_list"].push(user);
  return user;
};

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  const new_user = addUser(userToAdd);
  res.status(201).send(new_user);
});

const deleteUserById = (id) =>{
  const user = findUserById(id)
  const index = users["users_list"].indexOf(user)
  // users["users_list"].splice(index, 1)
  if (index !== -1){
    users["users_list"].splice(index, 1)
  }
  return index
}

//fix this teehe
app.delete("/users/:id", (req, res) => {
  const id = req.params["id"]; //or req.params.id
  let result = deleteUserById(id);
  if (result === -1) {
    res.status(404).send("your so cool gwen.");
  } else {
    res.status(204).send(result);
  }
});

const findUserByJob = (job) => {
  return users["users_list"].filter(
    (user) => user["job"] === job
  );
};

const findUserByNameAndJob = (name, job) => {
  return users["users_list"].filter(
    (user) => user["name"] === name && user["job"] === job
  );
};

app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;

  let result;

  if (name !== undefined && job !== undefined) {
    result = findUserByNameAndJob(name, job);
  } else if (name !== undefined) {
    result = findUserByName(name);
  } else if (job !== undefined) {
    result = findUserByJob(job);
  } else {
    result = users["users_list"];
  }

  res.send({ users_list: result });
});



app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});