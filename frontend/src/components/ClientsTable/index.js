import React from "react";
import Button from "../Button"
import "./index.css";

//Component for the employees table
function ClientsTable(props) {
    
    return (
        <main>
            <div className="search-wrapper m-3">
                <form className="search d-inline-block input-group m-3">
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
                <div className="filter d-inline-block input-group m-3">
                    <div className="d-inline-block input-group-prepend">
                        <label className="input-group-text">Recherche par...</label>
                    </div>
                    <select
                        value={props.filter}
                        name="filter"
                        onChange={props.handleFilterChange}
                        id="filter"
                        className="custom-select d-inline-block">
                        <option value="lastName">NOM</option>
                        <option value="firstName">PRENOM</option>
                        <option value="phone">TELEPHONE</option>
                    </select>
                </div>
                <Button/>
            </div>
            <div className="m-3">
                <table className="table mx-auto  mb-0  border">
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
