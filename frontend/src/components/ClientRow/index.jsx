import React from "react";

export default function ClientRow({ client, onEdit, onDelete, deleting }) {
  return (
    <tr>
      <td>{client.id}</td>
      <td>{client.lastname}</td>
      <td>{client.firstname}</td>
      <td>{client.phone}</td>
      <td className="text-nowrap">
        <button type="button" className="btn btn-outline-primary btn-sm me-2" disabled={deleting}
          aria-label={`Modifier ${client.firstname ?? ""} ${client.lastname}`} onClick={onEdit}>
          Modifier
        </button>
        <button type="button" className="btn btn-outline-danger btn-sm" disabled={deleting}
          aria-label={`Supprimer ${client.firstname ?? ""} ${client.lastname}`} onClick={onDelete}>
          Supprimer
        </button>
      </td>
    </tr>
  );
}
