import React from "react";

/* Client search form */
export  default function ClientSearchForm(props) {
  return (
        <div className="search-wrapper row mr-1 ml-1">
          <div className="d-flex mr-2">
            <div className="filter input-group mt-1">
                <label className="input-group-text">Recherche par...</label>
                <select
                    value={props.filter}
                    name="filter"
                    onChange={props.handleFilterChange}
                    id="filter"
                    className="custom-select d-block pl-3 bg-secondary text-white">
                    <option value="lastname">NOM</option>
                    <option value="firstname">PRENOM</option>
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
          <button
              onClick={props.handleShowForm}
              className="btn btn-success mt-1 float-right"
          >
              Ajouter un client
         </button>
      </div>
    )}
   
