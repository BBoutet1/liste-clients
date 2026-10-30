import React, { Component } from "react";
import Wrapper from "./components/Wrapper";
import ClientsTable from "./components/ClientsTable";
import Title from "./components/Title";

class App extends Component {
  render() {
    return (
      <Wrapper>
          <Title/>
          <ClientsTable/>
      </Wrapper>
    ); 
  }
}

export default App;
