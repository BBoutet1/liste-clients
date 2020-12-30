import React, { useEffect, useState } from "react";
import ClientRow from "../ClientRow";
import API from "../../services/client.service"
import ClientSearchForm from "../ClientSearchForm"
import NewClientForm from "../NewClientForm"
import "./index.css";

//Component for the clients table
export default function ClientsTable() {

  // Setting our component's initial state
  const [clients, setClients] = useState([]); // clients list
  const [filter, setFilter] = useState("lastname"); // column to filter (search)
  const [search, setSearch] = useState(""); // search input 
  const [sortBy, setSortBy] = useState("id"); // sorted colum
   const [showForm, setShowForm] = useState(false); // new client form
  
  /* Retrieving all the clients after the component mounted*/
  useEffect(() => {
        loadClients()
  }, [])
  
 /*  This function handle the filter change (search by id, name, ...)*/
  const handleFilterChange = event => {
    let value = event.target.value;
    // Updating the input's state
    setFilter(value)
  }

  /* This function handle the search input change */
  const handleInputChange = event => {
    // Getting the value of the search input which triggered the change
    let value = event.target.value;
    // Updating the input's state
    setSearch(value)
   };

/* Retrieving all the clients*/
  const loadClients = () => {
    API.getAll()
        .then(res => {
            //Replacing null values by empty string to allow the use of toLoweCase and toString without errors
            let data = JSON.parse(JSON.stringify(res.data,
                function (key, value) {
                    return (value == null) ? "" : value
              })); 
          setClients(data)
          setShowForm(false) 
      })
    .catch(err => console.log(err));
  }

      /* This function handle the sort culumn change */
  const handleSortChange = event => {
    // Getting the name (id) of the sorted column
       let ID = event.target.id;
    // Updating the input's state
     setSortBy(ID)
   };

  const handleShowForm = () => {
    setShowForm(true) 
  }
        return (
        <div className="m-3">
            {!showForm && <ClientSearchForm
                filter={filter}
                search={search}  
                handleFilterChange={handleFilterChange}
                handleInputChange={handleInputChange}
                handleShowForm={handleShowForm}
            />}
            {showForm && <NewClientForm
                loadClients={loadClients}
            />} 
            <table className="table mx-auto  mt-3  border">
                <thead  className="thead-light">
                    <tr>
                        <th><strong> ID</strong><i className="fa fa-sort-down ml-3" id="id" onClick={handleSortChange}/></th>
                        <th> <strong>NOM</strong><i className="fa fa-sort-down ml-2" id="lastname" onClick={handleSortChange}/></th>
                        <th><strong>PRENOM</strong><i className="fa fa-sort-down ml-2" id="firstname" onClick={handleSortChange}/></th>
                        <th><strong>TELEPHONE</strong><i className="fa fa-sort-down ml-2" id="phone" onClick={handleSortChange}/></th> 
                        <th/>
                        <th/>
                    </tr>
                </thead>
                {clients.length && <tbody>
                    {clients.sort((a, b) => (a[sortBy] > b[sortBy]) ? 1 : -1)
                    .filter(client => client[filter].toString().toLowerCase()
                    .includes(search.toString().toLowerCase())).map(client => (
                    <ClientRow 
                        key={client.id}
                        id={client.id}
                        lastname={client.lastname}
                        firstname={client.firstname}
                        phone={client.phone}
                    />
                    ))}
                </tbody>}
        </table>
    </div>);
    }
    

