import React, { useState, useEffect } from "react";
import "./index.css"

export default function Form(){
  // Setting our component's initial state
    const [client, setClient] = useState({});

    

  // Load all books and store them with setBooks
//   useEffect(() => {
//     loadUserData();
//   }, []);

    const handleInputChange = event => { 
        event.preventDefault();
       const { name, value } = event.target;
       if (event.target.value){setClient({...client, [name]: value})}
        console.log(client)
    }
 
    const handleSubmit = event => {
     
//   API.create()
//       .then(res => {
//         this.setState({
//           saved: true    
//         });
//       })
//     .catch(err => console.log(err));
  }
    return (
        
<form onSubmit={handleSubmit}>
  <div class="form-row mb-2 mt-1 mb-0">
    <div class="col mt-1">
        <input type="text" id="lastname" name="lastname" class="form-control" placeholder="Nom"
            onChange={handleInputChange}
        />
    </div>
    <div class="col mt-1">
        <input type="text" id="firstname" name="firstname" class="form-control" placeholder="Prénom"
            onChange={handleInputChange}
        />
    </div>
     <div class="col mt-1">
        <input type="tel" id="phone" name="phone" class="form-control mr-2" placeholder="Téléphone"
            onChange={handleInputChange}
        />
    </div>            
   </div>
   <button type="submit" class="btn btn-primary pr-2 pl-2  mt-1 mr-1">Sauvergarder</button>           
</form>)

}