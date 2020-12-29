import React, { Component } from "react";
import Wrapper from "./components/Wrapper";
import ClientSearchForm from "./components/ClientSearchForm"
import NewClientForm from "./components/NewClientForm"
import ClientsTable from "./components/ClientsTable";
import Title from "./components/Title";

class App extends Component {
  render() {
    return (
      <Wrapper>
          <Title/>
          <ClientSearchForm />
          <NewClientForm/>
          <ClientsTable/>
      </Wrapper>
    ); 
  }
}

export default App;
