import React from "react";
import API from "../../services/client.service"

//Component for each employee
function ClientRow(props) {
 // Deletes a book from the database with a given id, then reloads books from the db
    function deleteClient(event) {
      event.preventDefault();
    API.delete(props.id)
      .then(() => props.loadClients())
      .catch(err => console.log(err));
  }
    return (
        <tr>
            <td>{props.id}</td>
            <td>{props.lastname}</td>
            <td>{props.firstname}</td>
            <td>{props.phone}</td>
            <td><i className="fa fa-edit" id={props.id}/></td>
            <td><i onClick={deleteClient} className="fa fa-remove" id={props.id}/></td>
        </tr>
  );
}
export default ClientRow;
