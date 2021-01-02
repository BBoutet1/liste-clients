import React, { useState } from "react";
import API from "../../services/client.service"

export default function ClientUpdateForm(props) {  

    const [client, setClient] = useState({
        lastname: props.lastname,
        firstname: props.firstname,
        phone: props.lastname
    });

    
    const handleInputChange = event => { 
        event.preventDefault();
       const { name, value } = event.target;
       if (event.target.value){setClient({...client, [name]: value})}
    }


    const handleSubmit = event => {
        event.preventDefault();
        let id = props.id
       if (client.lastname !== undefined) {
        if (client.phone === undefined ) {
           API.update(id,client)
            .then(() => props.renderUpdate(id))
            .catch(err => console.log(err))
            alert("Client mis à jour!")
        }
        else if (client.phone !== undefined) {
            if (!isNaN(client.phone) && client.phone.length == 10) {
                  API.update(id, client)
                 .then(() =>  props.renderUpdate(id))
                 .catch(err => console.log(err))
                   alert("Client mis à jour!")
            }
            else {
              alert("Entrez un numéro de téléphone à 10 chiffres!")
          }
        }
      } else {
        alert("Entrez un nom pour enregistrer")
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