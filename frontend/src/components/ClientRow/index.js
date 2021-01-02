import React from "react";


//Component for each employee
function ClientRow(props) {
  
    return (
        <tr id ={props.id}>
            <td>{props.id}</td>
            <td>{props.lastname}</td>
            <td>{props.firstname}</td>
            <td>{props.phone}</td>
            <td><i onClick={()=> props.openUpdateForm (props.id)} className="fa fa-edit" id={props.id}/></td>
            <td><i onClick={props.deleteClient} className="fa fa-trash" id={props.id}/></td>
        </tr>
  );
}
export default ClientRow;
