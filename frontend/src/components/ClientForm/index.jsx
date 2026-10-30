import React, { useState } from "react";

export default function ClientForm({ initialClient = {}, onSave, onCancel, submitLabel }) {
  const [client, setClient] = useState({
    lastname: initialClient.lastname ?? "",
    firstname: initialClient.firstname ?? "",
    phone: initialClient.phone ?? "",
  });
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const prefix = `client-${initialClient.id ?? "new"}`;

  const handleChange = ({ target: { name, value } }) => {
    setClient((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const cleaned = Object.fromEntries(Object.entries(client).map(([key, value]) => [key, value.trim()]));
    if (!cleaned.lastname) {
      setError("Le nom est obligatoire.");
      return;
    }
    if (cleaned.phone && !/^[0-9]{10}$/.test(cleaned.phone)) {
      setError("Le téléphone doit être vide ou contenir 10 chiffres.");
      return;
    }
    setPending(true);
    setError("");
    try {
      await onSave(cleaned);
    } catch (failure) {
      setError(failure.message || "Impossible d’enregistrer le client. Réessayez.");
    } finally {
      setPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} aria-label={initialClient.id ? "Modifier un client" : "Ajouter un client"}>
      <fieldset disabled={pending}>
        <div className="row align-items-end">
          <div className="col-sm mb-2">
            <label htmlFor={`${prefix}-lastname`}>Nom</label>
            <input id={`${prefix}-lastname`} name="lastname" className="form-control"
              value={client.lastname} onChange={handleChange} required maxLength={30} />
          </div>
          <div className="col-sm mb-2">
            <label htmlFor={`${prefix}-firstname`}>Prénom (facultatif)</label>
            <input id={`${prefix}-firstname`} name="firstname" className="form-control"
              value={client.firstname} onChange={handleChange} maxLength={30} />
          </div>
          <div className="col-sm mb-2">
            <label htmlFor={`${prefix}-phone`}>Téléphone (facultatif)</label>
            <input id={`${prefix}-phone`} name="phone" type="tel" inputMode="numeric"
              className="form-control" value={client.phone} onChange={handleChange}
              pattern="[0-9]{10}" maxLength={10} aria-describedby={`${prefix}-phone-help`} />
            <small id={`${prefix}-phone-help`} className="text-muted">10 chiffres, sans espaces.</small>
          </div>
          <div className="col-auto mb-2 form-actions">
            <button type="submit" className="btn btn-primary me-2">{pending ? "Enregistrement…" : submitLabel}</button>
            <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>Annuler</button>
          </div>
        </div>
      </fieldset>
      {error && <p role="alert" className="alert alert-danger mt-2">{error}</p>}
    </form>
  );
}
