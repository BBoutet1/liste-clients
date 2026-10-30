import React from "react";

export default function ClientSearchForm({ filter, search, onFilterChange, onSearchChange, onAdd }) {
  return (
    <div className="search-wrapper mb-3">
      <div className="search-fields d-flex align-items-center">
        <label htmlFor="filter" className="me-2">Rechercher par</label>
        <select id="filter" className="form-select me-2" value={filter} onChange={onFilterChange}>
          <option value="lastname">Nom</option>
          <option value="firstname">Prénom</option>
          <option value="phone">Téléphone</option>
        </select>
        <label htmlFor="search" className="visually-hidden">Recherche</label>
        <input id="search" type="search" className="form-control" value={search} onChange={onSearchChange} placeholder="Recherche" />
      </div>
      <button type="button" className="btn btn-success" onClick={onAdd}>Ajouter un client</button>
    </div>
  );
}
