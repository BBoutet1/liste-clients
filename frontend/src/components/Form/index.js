import React, { useState, useEffect } from "react";
import "./index.css"

export default function Form(){
  // Setting our component's initial state
  const [client, setClient] = useState({});

  // Load all books and store them with setBooks
//   useEffect(() => {
//     loadUserData();
//   }, []);

 
    const handleSubmit = (e) => {
        let data = e.event;
        console.log(data)
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
  <div class="form-row mb-2 mt-1">
    <div class="col mt-1">
      <input type="text" class="form-control" placeholder="Nom"/>
    </div>
    <div class="col mt-1">
      <input type="text" class="form-control" placeholder="Prénom"/>
    </div>
     <div class="col mt-1">
      <input type="tel" class="form-control" placeholder="Téléphone" pattern="[(][0-9]{3}[)] [0-9]{3}-[0-9]{4}" />
    </div>  
    <button type="submit" class="btn btn-primary pr-2 pl-2  mt-1 mr-1 ml-1">Sauvergarder</button>            
 </div>            
</form>)

}