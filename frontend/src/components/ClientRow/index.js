import React from "react";

//Component for each employee
function ClientRow(props) {
    return (
        <tr>
            <td>{props.id}</td>
            <td>{props.lastName}</td>
            <td>{props.firstName}</td>
            <td pattern="[(][0-9]{3}[)] [0-9]{3}-[0-9]{4}">{props.phone}</td>
        </tr>
  );
}
export default ClientRow;
