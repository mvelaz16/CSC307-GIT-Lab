// src/Form.jsx
import React, { useState } from "react";

function Form(props) {
  const [person, setPerson] = useState({
    name: "",
    job: ""
  });

  // Function to handle input changes
  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "job")
      setPerson({ name: person["name"], job: value });
    else setPerson({ name: value, job: person["job"] });
  }

  // Function to handle form submission
  function submitForm() {
    props.handleSubmit(person); // Pass the person data to the parent
    setPerson({ name: "", job: "" }); // Reset form state after submit
  }

  return (
    <form>
      <label htmlFor="name">Name</label>
      <input
        type="text"
        name="name"
        id="name"
        value={person.name}
        onChange={handleChange}
      />

      <label htmlFor="job">Job</label>
      <input
        type="text"
        name="job"
        id="job"
        value={person.job}
        onChange={handleChange}
      />

      <input
        type="button"
        value="Submit"
        onClick={submitForm} // Call submitForm when clicked
      />
    </form>
  );
}

export default Form;
