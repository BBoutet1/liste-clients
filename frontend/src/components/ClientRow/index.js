import React from "react";

//Component for each employee
function ClientRow(props) {
    return (
        <tr>
            <td>{props.id}</td>
            <td>{props.lastname}</td>
            <td>{props.firstname}</td>
            <td>{props.phone}</td>
            <td><i className="fa fa-edit" id={props.id}/></td>
            <td><i className="fa fa-remove" id={props.id}/></td>
        </tr>
  );
}
export default ClientRow;
