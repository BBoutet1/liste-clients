import React, { useState} from "react";
import API from "../../api"

//New client form compoent
export default function NewClientForm(props){
  // Setting our component's initial state
    const [client, setClient] = useState({});

  /* This function handle the new client update form */
    const handleInputChange = event => { 
        event.preventDefault();
       const { name, value } = event.target;
       if (event.target.value){setClient({...client, "id": null , [name]: value})}
    }
 
  /* This function handle the new client form submission */
    const handleSubmit = event => {
      event.preventDefault();
       if (client.lastname !== undefined) {
        if (client.phone === undefined ) {
          API.create(client)
            .then(() => {
                  alert("Client enregistré!")
                  props.loadClients()
                })
             .catch(err => console.log(err))
        }
        else if (client.phone !== undefined) {
            if (!isNaN(client.phone) && client.phone.length == 10) {
              API.create(client)
                .then(() => {
                  alert("Client enregistré!")
                  props.loadClients()
                })
                  .catch(err => console.log(err))
            }
            else {
              alert("Entrez un numéro de téléphone à 10 chiffres!")
          }
        }
      } else {
        alert("Entrez un nom pour enregistrer")
       }
      props.loadClients()
    }
  
    return (
        
<form onSubmit={handleSubmit}>
  <div class="form-row mt-1 mb-0">
    <div class="col mt-1">
        <input type="text" id="lastname" name="lastname" class="form-control" placeholder="Nom"
            onChange={handleInputChange}
        />
    </div>
    <div class="col mt-1">
        <input type="text" id="firstname" name="firstname" class="form-control" placeholder="Prénom(option)"
            onChange={handleInputChange}
        />
    </div>
     <div class="col mt-1">
        <input type="tel" id="phone" name="phone" class="form-control mr-2" placeholder="Téléphone(option)"
              onChange={handleInputChange}
              maxLength="10"
        />
          </div>  
    <button type="submit" class="btn btn-primary pr-2 pl-2  mt-1 mr-1">Sauvergarder</button>      
   </div>         
</form>)

}