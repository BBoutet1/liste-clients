import React from "react";
import Button from "../Button"
import Form from "../Form"
import "./index.css";

//Component for the clients table
function ClientsTable(props) {
    
    return (
        <main>
            <div className="search-wrapper row m-3">
                <div className="d-flex mr-2">
                    <div className="filter input-group mt-1">
                        <label className="input-group-text">Recherche par...</label>
                        <select
                            value={props.filter}
                            name="filter"
                            onChange={props.handleFilterChange}
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
                                value={props.search}
                                name="search"
                                onChange={props.handleInputChange}
                                id="search"
                                type="text" className="form-control" placeholder="Recherche"
                            />
                        </div>
                    </form>  
                </div>
                <Button
                    onClick={props. openAddClient}
                    text="Ajouter un client"
                    classes = "btn btn-success mt-1 float-right"
                />
            </div>
            <div className="m-3">
                <Form/>
                <table className="table mx-auto  mt-3  border">
                    <thead  className="thead-light">
                        <tr>
                            <th><strong> ID</strong><i className="fa fa-sort-down ml-3" id="id" onClick={props.handleSortChange}></i></th>
                            <th> <strong>NOM</strong><i className="fa fa-sort-down ml-2" id="lastName" onClick={props.handleSortChange}></i></th>
                            <th><strong>PRENOM</strong><i className="fa fa-sort-down ml-2" id="firstName" onClick={props.handleSortChange}></i></th>
                            <th><strong>TELEPHONE</strong><i className="fa fa-sort-down ml-2" id="phone" onClick={props.handleSortChange}></i></th> 
                      </tr>
                    </thead>
                    <tbody>{props.children}</tbody>
                </table>
            </div>
        </main>);
}

export default ClientsTable;
