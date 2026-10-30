import React, { useEffect, useState } from "react";
import API from "../../api";
import ClientRow from "../ClientRow";
import ClientSearchForm from "../ClientSearchForm";
import NewClientForm from "../NewClientForm";
import ClientUpdateForm from "../ClientUpdateForm";

const columns = [["id", "ID"], ["lastname", "Nom"], ["firstname", "Prénom"], ["phone", "Téléphone"]];

export default function ClientsTable() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [filter, setFilter] = useState("lastname");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const loadClients = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await API.getAll();
      setClients(Array.isArray(data) ? data : []);
    } catch {
      setError("Impossible de charger les clients. Vérifiez la connexion et réessayez.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadClients(); }, []);

  const createClient = async (data) => {
    const saved = await API.create(data);
    setClients((current) => [...current, saved]);
    setShowForm(false);
    setStatus("Client enregistré.");
  };

  const updateClient = async (id, data) => {
    const saved = await API.update(id, data);
    setClients((current) => current.map((client) => client.id === id ? saved : client));
    setEditingId(null);
    setStatus("Client mis à jour.");
  };

  const deleteClient = async (id) => {
    setDeletingId(id);
    setError("");
    try {
      await API.delete(id);
      setClients((current) => current.filter((client) => client.id !== id));
      setStatus("Client supprimé.");
    } catch {
      setError("Impossible de supprimer ce client. Réessayez.");
    } finally {
      setDeletingId(null);
    }
  };

  const visibleClients = clients
    .filter((client) => String(client[filter] ?? "").toLocaleLowerCase("fr").includes(search.toLocaleLowerCase("fr")))
    .sort((a, b) => sortBy === "id" ? a.id - b.id : String(a[sortBy] ?? "").localeCompare(String(b[sortBy] ?? ""), "fr"));

  return (
    <main className="container pb-4">
      <p className="alert alert-info">Projet de démonstration : utilisez uniquement des données fictives.</p>
      {status && <p role="status" className="alert alert-success">{status}</p>}
      {error && <div role="alert" className="alert alert-danger">{error} <button type="button" className="btn btn-link" onClick={loadClients}>Recharger</button></div>}
      <ClientSearchForm filter={filter} search={search} onFilterChange={(event) => setFilter(event.target.value)}
        onSearchChange={(event) => setSearch(event.target.value)}
        onAdd={() => { setShowForm(true); setEditingId(null); setStatus(""); }} />
      {showForm && <NewClientForm onSave={createClient} onCancel={() => setShowForm(false)} />}
      {loading ? <p role="status">Chargement des clients…</p> : (
        <div className="table-responsive">
          <table className="table table-bordered mt-3">
            <caption className="visually-hidden">Liste des clients, avec recherche, tri, modification et suppression.</caption>
            <thead className="table-light"><tr>
              {columns.map(([key, label]) => (
                <th key={key} scope="col" aria-sort={sortBy === key ? "ascending" : "none"}>
                  <button type="button" className="sort-button" aria-label={`Trier par ${label.toLowerCase()}`} onClick={() => setSortBy(key)}>
                    {label} <span aria-hidden="true">↑</span>
                  </button>
                </th>
              ))}
              <th scope="col">Actions</th>
            </tr></thead>
            <tbody>
              {visibleClients.map((client) => editingId === client.id ? (
                <ClientUpdateForm key={client.id} client={client} onSave={(data) => updateClient(client.id, data)} onCancel={() => setEditingId(null)} />
              ) : (
                <ClientRow key={client.id} client={client} deleting={deletingId === client.id}
                  onEdit={() => { setEditingId(client.id); setShowForm(false); setStatus(""); }} onDelete={() => deleteClient(client.id)} />
              ))}
              {!visibleClients.length && <tr><td colSpan={5} className="text-center py-4">
                {clients.length ? "Aucun client ne correspond à la recherche." : "Pas de client dans la liste. Ajoutez un client !"}
              </td></tr>}
            </tbody>
          </table>
        </div>
      )}
    </main>
  );
}
