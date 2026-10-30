import React from "react";
import ClientForm from "../ClientForm";

export default function ClientUpdateForm({ client, onSave, onCancel }) {
  return (
    <tr><td colSpan={5}>
      <ClientForm initialClient={client} onSave={onSave} onCancel={onCancel} submitLabel="Enregistrer les modifications" />
    </td></tr>
  );
}
