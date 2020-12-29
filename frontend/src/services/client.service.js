import http from "../htt-common";

class ClientDataService {
    getAll() {
        return http.get("/clients");
    }

    get(id) {
        return http.get(`/clients/${id}`);
    }

    async create(data) {
        console.log(null)
        return http.post("/clients", data);
    }

    update(id, data) {
        return http.put(`/clients/${id}`, data);
    }

    delete(id) {
        return http.delete(`/clients/${id}`);
    }
}

export default new ClientDataService();