import request from "../htt-common";

const API = {
  getAll: () => request("/clients"),
  get: (id) => request(`/clients/${id}`),
  create: (client) => request("/clients", { method: "POST", body: JSON.stringify(client) }),
  update: (id, client) => request(`/clients/${id}`, { method: "PUT", body: JSON.stringify(client) }),
  delete: (id) => request(`/clients/${id}`, { method: "DELETE" }),
};
export default API;
