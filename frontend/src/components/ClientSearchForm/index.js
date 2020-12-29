import React, { Component } from "react";
import API from "../../services/client.service"
import ClientAddButton from "../Button"
export default class ClientSearchForm extends Component {

/* Setting the component's initial state */
state = {
    clients:{},
    filter:"lastname", // Search filter match initialized to the firstName property(column)
    search: "", //search input
    sortBy: "id", // table initially sorted by client id
    saved: true // last client saved
  }; 

/* Retrieving all the clients after the component mounted*/
  componentDidMount = () => {
    API.getAll()
      .then(res => {
        this.setState({
          clients: res.data    
        });
      })
    .catch(err => console.log(err));
  }

 /*  This function handle the filter change (search by id, name, ...)*/
  handleFilterChange = event => {
    let value = event.target.value;
    // Updating the input's state
    console.log(value)
    this.setState({
      filter: value // filter 
    });
  }

  /* This function handle the search input change */
  handleInputChange = event => {
    // Getting the value of the search input which triggered the change
    let value = event.target.value;
    // Updating the input's state
    this.setState({
      search: value
    });
   };


    render() {
        return (
        <div className="search-wrapper row m-3">
        <div className="d-flex mr-2">
            <div className="filter input-group mt-1">
                <label className="input-group-text">Recherche par...</label>
                <select
                    value={this.state.filter}
                    name="filter"
                    onChange={this.handleFilterChange}
                    id="filter"
                    className="custom-select d-block pl-3 bg-secondary text-white">
                    <option value="lastName">NOM</option>
                    <option value="firstName">PRENOM</option>
                    <option value="phone">TELEPHONE</option>
                </select>
            </div>
            <form className="search input-group mt-1 mr-2 d-inline">
                <div className="input-group">
                    <input
                        value={this.state.search}
                        name="search"
                        onChange={this.handleInputChange}
                        id="search"
                        type="text" className="form-control" placeholder="Recherche"
                    />
                </div>
            </form>  
        </div>
        <ClientAddButton
            text="Ajouter un client"
            classes = "btn btn-success mt-1 float-right"
        />
    </div>
    )}
   
}