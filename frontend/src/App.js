import React, { Component } from "react";
import Wrapper from "./components/Wrapper";
import ClientsTable from "./components/ClientsTable";
import ClientRow from "./components/ClientRow";
import clients from "./clients.json";
import Title from "./components/Title";


class App extends Component {
  
// Setting the component's initial state
state = {
    clients,
    filter:"lastName", // Search filter match initialized to the firstName property(column)
    search: "", //search input
    sortBy:"id" // table initially sorted by client id
  };

  //This function handle the search filter type change
  handleFilterChange = event => {
    let value = event.target.value;
    // Updating the input's state
    this.setState({
      filter: value // filter 
    });
  }

  //This function handle the search input change
  handleInputChange = event => {
    // Getting the value of the search input which triggered the change
    let value = event.target.value;
    // Updating the input's state
    this.setState({
      search: value
    });
   };
  
    //This function handle the sort category change
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
      <Wrapper>
      <Title>Employee directory</Title>
        <ClientsTable
          handleInputChange={this.handleInputChange}
          handleFilterChange={this.handleFilterChange}
          handleSortChange={this.handleSortChange}
        >
            {this.state.clients.sort((a, b) => (a[this.state.sortBy] > b[this.state.sortBy]) ? 1 : -1).filter(client => client[this.state.filter].includes(this.state.search)).map(client => (
            <ClientRow 
            key={client.id}
            id={client.id}
            lastName={client.lastName}
            firstName={client.firstName}
            phone={client.phone}
          />
        ))}
        </ClientsTable>
      </Wrapper>
    ); 
  }
}

export default App;
