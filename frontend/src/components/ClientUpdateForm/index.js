import React, { useState } from "react";
import ReactDOM from "react-dom";
import API from "../../api"
import ClientUpdateRow from "../ClientUpdateRow"

// Client update form component
export default function ClientUpdateForm(props) {  
     // Setting our component's initial state
    const [client, setClient] = useState({
        lastname: props.lastname,
        firstname: props.firstname,
        phone: props.phone
    });

    /*  This function handle client update inputs change (search by id, name, ...)*/
    const handleInputChange = event => { 
        event.preventDefault();
       const { name, value } = event.target;
        setClient({...client, [name]: value})
    }

    /* This function handle the client update form submission */
    const handleSubmit = event => {
        event.preventDefault()
        let id = props.id
        
        if (client.lastname.length && client.lastname.length > 0) {
            if (client.phone === "" || !isNaN(client.phone) && client.phone.length === 10) {
            API.update(id,client)
                .then(() => props.renderUpdate(id))
                .catch(err => console.log(err))
                alert("Client mis à jour!")
                }
            else {
                alert("Entrez un numéro de téléphone à 10 chiffres!")
                 ReactDOM.render(
                    <ClientUpdateRow
                        id={id}
                        deleteClient={props.deleteClient}
                        openUpdateForm={props.openUpdateForm}
                    />, document.getElementById(id));
                    }
        
      } else {
           alert("Entrez un nom (2 caractères au moins) pour enregistrer")
             ReactDOM.render(
                    <ClientUpdateRow
                        id={id}
                        deleteClient={props.deleteClient}
                        openUpdateForm={props.openUpdateForm}
                    />, document.getElementById(id));
       }
  }

    return (
        <>
            <td className="card-body">{props.id}</td>
            <td>
               <form className="search input-group mt-1 mr-2 d-inline">
                    <div className="input-group">
                        <input
                            name="lastname"
                            onChange={handleInputChange}
                            id="lastname"
                            type="text" className="form-control" defaultValue={props.lastname}
                        />
                    </div>
                </form>
            </td>
            <td>
                <form className="search input-group mt-1 mr-2 d-inline">
                    <div className="input-group">
                        <input
                            name="firstname"
                            onChange={handleInputChange}
                            id="firstname"
                            type="text" className="form-control" defaultValue={props.firstname}
                        />
                    </div>
                </form>
            </td>
            <td>
                <form className="search input-group mt-1 mr-2 d-inline">
                    <div className="input-group">
                        <input
                            name="phone"
                            onChange={handleInputChange}
                            id="phone"
                            type="text" className="form-control" defaultValue={props.phone}
                        />
                    </div>
                </form>
            </td>
            <td><i id={props.id} onClick={handleSubmit} className="fa fa-save"/></td>
            <td><i id={props.id} onClick={(() =>  props.renderUpdate(props.id))} className="fa fa-close"/></td>
        </>
    )
}