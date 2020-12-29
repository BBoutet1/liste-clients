import React, { Component } from "react";
import ClientRow from "../ClientRow";
import API from "../../services/client.service"
import NewClientForm from "../NewClientForm"
import "./index.css";

//Component for the clients table
export default class ClientsTable extends Component {
    /* Setting the component's initial state */
    state = {
        clients:{},
        filter:"lastname", // Search filter match initialized to the firstName property(column)
        search: "", //search input
        sortBy: "id", // table initially sorted by client id
    }; 

/* Retrieving all the clients*/
  loadClients = () => {
    API.getAll()
      .then(res => {
        this.setState({
          clients: res.data    
        });
      })
    .catch(err => console.log(err));
  }

/* Retrieving all the clients after the component mounted*/
  componentDidMount = () => {
        this.loadClients()
  }

      /* This function handle the sort culumn change */
   handleSortChange = event => {
    // Getting the name (id) of the sorted column
    let ID = event.target.id;
    // Updating the input's state
    this.setState({
      sortBy: ID
    });
   };

    render() {
        return (
        <div className="m-3">
                <NewClientForm
                    loadClients={this.loadClients}
                />  
            <table className="table mx-auto  mt-3  border">
                <thead  className="thead-light">
                    <tr>
                        <th><strong> ID</strong><i className="fa fa-sort-down ml-3" id="id" onClick={this.handleSortChange}></i></th>
                        <th> <strong>NOM</strong><i className="fa fa-sort-down ml-2" id="lastName" onClick={this.handleSortChange}></i></th>
                        <th><strong>PRENOM</strong><i className="fa fa-sort-down ml-2" id="firstName" onClick={this.handleSortChange}></i></th>
                        <th><strong>TELEPHONE</strong><i className="fa fa-sort-down ml-2" id="phone" onClick={this.handleSortChange}></i></th> 
                    </tr>
                </thead>
                    {this.state.clients.length && <tbody>
                    {this.state.clients.sort((a, b) => (a[this.state.sortBy] > b[this.state.sortBy]) ? 1 : -1)
                    .filter(client => client[this.state.filter].toString().toLowerCase()
                    .includes(this.state.search.toString().toLowerCase())).map(client => (
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
    
}

