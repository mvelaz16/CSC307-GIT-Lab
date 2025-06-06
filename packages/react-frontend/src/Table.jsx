// src/Table.jsx
import React from "react";

function TableHeader(){
    return(
        <thead>
            <tr>
                <th>Name</th>
                <th>Job</th>
                <th>Id</th>
                <th>Delete</th>
            </tr>
        </thead>
    );
}
// src/Table.jsx
function TableBody(props) {
    const rows = props.characterData.map((row) => {
      return (
        <tr key={row.id}>
        <td>{row.name}</td>
        <td>{row.job}</td>
        <td>{row.id}</td>
        <td>
            <button onClick={() => props.removeCharacter(row.id)}>
            Delete
            </button>
        </td>
        </tr>
      );
     }
    );
    return (
        <tbody>
          {rows}
         </tbody>
     );
  }
  
  function Table(props) {
    return (
      <table>
        <TableHeader />
        <TableBody
          characterData={props.characterData}
          removeCharacter={props.removeCharacter}
        />
      </table>
    );
  }
  export default Table;