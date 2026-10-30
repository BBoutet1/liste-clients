import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ClientsTable from "./index";
import API from "../../api";

vi.mock("../../api", () => ({ default: { getAll: vi.fn(), create: vi.fn(), update: vi.fn(), delete: vi.fn() } }));
const initial = { id: 1, lastname: "Exemple", firstname: "Camille", phone: "4185550101" };

beforeEach(() => { vi.resetAllMocks(); API.getAll.mockResolvedValue([]); });

describe("gestion des clients", () => {
  it("accepte une réponse vide et permet un cycle de création, modification et suppression", async () => {
    API.getAll.mockResolvedValue(null);
    API.create.mockResolvedValue(initial);
    API.update.mockResolvedValue({ ...initial, firstname: "", phone: "" });
    API.delete.mockResolvedValue(null);
    const user = userEvent.setup();
    render(<ClientsTable />);
    expect(await screen.findByText(/Pas de client/)).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Ajouter un client" }));
    await user.type(screen.getByLabelText("Nom", { exact: true }), "Exemple");
    await user.type(screen.getByLabelText("Prénom (facultatif)"), "Camille");
    await user.type(screen.getByLabelText("Téléphone (facultatif)"), "4185550101");
    await user.click(screen.getByRole("button", { name: "Enregistrer", exact: true }));
    expect(await screen.findByText("Client enregistré.")).toBeInTheDocument();
    expect(API.create).toHaveBeenCalledWith({ lastname: "Exemple", firstname: "Camille", phone: "4185550101" });
    await user.click(screen.getByRole("button", { name: "Modifier Camille Exemple" }));
    await user.clear(screen.getByLabelText("Prénom (facultatif)"));
    await user.clear(screen.getByLabelText("Téléphone (facultatif)"));
    await user.click(screen.getByRole("button", { name: "Enregistrer les modifications" }));
    expect(await screen.findByText("Client mis à jour.")).toBeInTheDocument();
    expect(API.update).toHaveBeenCalledWith(1, { lastname: "Exemple", firstname: "", phone: "" });
    await user.click(screen.getByRole("button", { name: /Supprimer.*Exemple/ }));
    expect(await screen.findByText("Client supprimé.")).toBeInTheDocument();
    expect(screen.getByText(/Pas de client/)).toBeInTheDocument();
  });

  it("cherche par téléphone et trie les résultats sans modifier les données chargées", async () => {
    const data = [{ ...initial, id: 2 }, { id: 1, lastname: "Autre", firstname: null, phone: null }];
    API.getAll.mockResolvedValue(data);
    const user = userEvent.setup();
    render(<ClientsTable />);
    await screen.findByText("Camille");
    await user.click(screen.getByRole("button", { name: "Trier par nom" }));
    const rows = within(screen.getByRole("table")).getAllByRole("row");
    expect(rows[1]).toHaveTextContent("Autre");
    expect(data[0].id).toBe(2);
    await user.selectOptions(screen.getByLabelText("Rechercher par"), "phone");
    await user.type(screen.getByRole("searchbox", { name: "Recherche" }), "418");
    expect(screen.getByText("Camille")).toBeInTheDocument();
    expect(screen.queryByText("Autre")).not.toBeInTheDocument();
  });

  it("conserve le formulaire et les saisies en cas d’échec d’enregistrement", async () => {
    API.create.mockRejectedValue(new Error("Service indisponible."));
    const user = userEvent.setup();
    render(<ClientsTable />);
    await screen.findByText(/Pas de client/);
    await user.click(screen.getByRole("button", { name: "Ajouter un client" }));
    await user.type(screen.getByLabelText("Nom", { exact: true }), "Exemple");
    await user.click(screen.getByRole("button", { name: "Enregistrer", exact: true }));
    expect(await screen.findByRole("alert")).toHaveTextContent("Service indisponible.");
    expect(screen.getByLabelText("Nom", { exact: true })).toHaveValue("Exemple");
    expect(screen.queryByText("Client enregistré.")).not.toBeInTheDocument();
  });

  it("attend la réponse du serveur avant d’annoncer un succès et bloque les doubles envois", async () => {
    let complete;
    API.create.mockReturnValue(new Promise((resolve) => { complete = resolve; }));
    const user = userEvent.setup();
    render(<ClientsTable />);
    await screen.findByText(/Pas de client/);
    await user.click(screen.getByRole("button", { name: "Ajouter un client" }));
    await user.type(screen.getByLabelText("Nom", { exact: true }), "Exemple");
    await user.click(screen.getByRole("button", { name: "Enregistrer", exact: true }));
    expect(screen.getByRole("button", { name: "Enregistrement…" })).toBeDisabled();
    expect(screen.queryByText("Client enregistré.")).not.toBeInTheDocument();
    complete(initial);
    expect(await screen.findByText("Client enregistré.")).toBeInTheDocument();
    expect(API.create).toHaveBeenCalledTimes(1);
  });

  it("permet de recharger après une erreur de connexion", async () => {
    API.getAll.mockRejectedValueOnce(new Error("Network error")).mockResolvedValueOnce([initial]);
    const user = userEvent.setup();
    render(<ClientsTable />);
    expect(await screen.findByRole("alert")).toHaveTextContent(/Impossible de charger/);
    await user.click(screen.getByRole("button", { name: "Recharger" }));
    expect(await screen.findByText("Camille")).toBeInTheDocument();
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("ne supprime pas la ligne si la requête de suppression échoue", async () => {
    API.getAll.mockResolvedValue([initial]);
    API.delete.mockRejectedValue(new Error("Network error"));
    const user = userEvent.setup();
    render(<ClientsTable />);
    await screen.findByText("Camille");
    await user.click(screen.getByRole("button", { name: "Supprimer Camille Exemple" }));
    expect(await screen.findByRole("alert")).toHaveTextContent(/Impossible de supprimer/);
    expect(screen.getByText("Camille")).toBeInTheDocument();
  });
});
