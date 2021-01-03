import React, {useState, useEffect} from "react";
import API from "../../api"

// Client update form component
export default function ClientUpdateRow(props) { 
    const [client, setClient] = useState({});

    useEffect(() => {
        getClient(props.id)
    })
    /* This function retrieves the client by id*/ 
     const getClient = id => {
      API.get(id)
          .then(res => {
              setClient(res.data)
          })
             .catch(err => console.log(err));
    }
    return (
    <>
        {(client!=={})&&<>
            <td>{client.id}</td>
            <td>{client.lastname}</td>
            <td>{client.firstname}</td>
            <td>{client.phone}</td>
            <td><i onClick={()=> props.openUpdateForm (client.id)} className="fa fa-edit" id={client.id}/></td>
            <td><i onClick={props.deleteClient} className="fa fa-trash" id={client.id}/></td>
        </>}
     </>
    )
}