import React, {useState, useEffect} from "react";
import API from "../../services/client.service"

export default function ClientUpdateRow(props) { 
    const [client, setClient] = useState({});

    useEffect(() => {
        getClient(props.id)
    })

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