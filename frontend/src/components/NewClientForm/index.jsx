import React from "react";
import ClientForm from "../ClientForm";

export default function NewClientForm(props) {
  return <ClientForm {...props} submitLabel="Enregistrer" />;
}
