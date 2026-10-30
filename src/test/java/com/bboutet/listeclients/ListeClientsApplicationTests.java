package com.bboutet.listeclients;

import com.bboutet.listeclients.model.Client;
import com.bboutet.listeclients.repo.ClientRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
class ListeClientsApplicationTests {
    @Autowired MockMvc mvc;
    @Autowired ClientRepository clients;

    @BeforeEach
    void clearClients() {
        clients.deleteAll();
    }

    @Test
    void emptyCollectionIsAnArray() throws Exception {
        mvc.perform(get("/api/clients"))
                .andExpect(status().isOk()).andExpect(content().json("[]"));
    }

    @Test
    void clientCanBeCreatedReadUpdatedAndDeleted() throws Exception {
        String location = mvc.perform(post("/api/clients").contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"lastname":" Exemple ","firstname":"Camille","phone":"4185550101"}
                                """))
                .andExpect(status().isCreated()).andExpect(jsonPath("$.lastname").value("Exemple"))
                .andReturn().getResponse().getHeader("Location");
        mvc.perform(get(location)).andExpect(status().isOk())
                .andExpect(jsonPath("$.phone").value("4185550101"));
        mvc.perform(put(location).contentType(MediaType.APPLICATION_JSON)
                        .content("""
                                {"lastname":"Autre","firstname":"","phone":""}
                                """))
                .andExpect(status().isOk()).andExpect(jsonPath("$.firstname").value(""))
                .andExpect(jsonPath("$.phone").value(""));
        mvc.perform(get("/api/clients")).andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].lastname").value("Autre"));
        mvc.perform(delete(location)).andExpect(status().isNoContent());
        mvc.perform(get(location)).andExpect(status().isNotFound());
        mvc.perform(get("/api/clients")).andExpect(content().json("[]"));
    }

    @ParameterizedTest
    @ValueSource(strings = {
            "{}", "{\"lastname\":null}", "{\"lastname\":\"  \"}",
            "{\"lastname\":\"Exemple\",\"phone\":\"123\"}",
            "{\"lastname\":\"Exemple\",\"phone\":\"1e23456789\"}",
            "{\"lastname\":\"abcdefghijklmnopqrstuvwxyz12345\"}",
            "{\"lastname\":\"Exemple\",\"firstname\":\"abcdefghijklmnopqrstuvwxyz12345\"}"
    })
    void invalidCreationReturnsFieldErrorsAndDoesNotWrite(String body) throws Exception {
        mvc.perform(post("/api/clients").contentType(MediaType.APPLICATION_JSON).content(body))
                .andExpect(status().isBadRequest()).andExpect(jsonPath("$.errors").isMap());
        mvc.perform(get("/api/clients")).andExpect(content().json("[]"));
    }

    @Test
    void optionalFieldsMayBeOmitted() throws Exception {
        mvc.perform(post("/api/clients").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"lastname\":\"Exemple\"}"))
                .andExpect(status().isCreated()).andExpect(jsonPath("$.firstname").value(""))
                .andExpect(jsonPath("$.phone").value(""));
    }

    @Test
    void invalidUpdatePreservesStoredClient() throws Exception {
        Client client = clients.save(new Client("Exemple", "Camille", "4185550101"));
        mvc.perform(put("/api/clients/" + client.getId()).contentType(MediaType.APPLICATION_JSON)
                        .content("{\"lastname\":\"\",\"phone\":\"123\"}"))
                .andExpect(status().isBadRequest());
        mvc.perform(get("/api/clients/" + client.getId()))
                .andExpect(jsonPath("$.lastname").value("Exemple"))
                .andExpect(jsonPath("$.phone").value("4185550101"));
    }

    @Test
    void missingClientReturns404ForReadUpdateAndDelete() throws Exception {
        mvc.perform(get("/api/clients/999999")).andExpect(status().isNotFound());
        mvc.perform(put("/api/clients/999999").contentType(MediaType.APPLICATION_JSON)
                        .content("{\"lastname\":\"Exemple\"}"))
                .andExpect(status().isNotFound());
        mvc.perform(delete("/api/clients/999999")).andExpect(status().isNotFound());
    }

    @Test
    void nameFilterIsCaseInsensitiveAndBlankMeansAll() throws Exception {
        clients.save(new Client("Exemple", "Camille", ""));
        clients.save(new Client("Autre", "Alex", ""));
        mvc.perform(get("/api/clients").param("name", " XEMP "))
                .andExpect(status().isOk()).andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].lastname").value("Exemple"));
        mvc.perform(get("/api/clients").param("name", " ")).andExpect(jsonPath("$", hasSize(2)));
        mvc.perform(get("/api/clients").param("name", "introuvable")).andExpect(content().json("[]"));
    }

    @Test
    void healthIsPublicWithoutExposingConfiguration() throws Exception {
        mvc.perform(get("/actuator/health")).andExpect(status().isOk())
                .andExpect(jsonPath("$.status").value("UP"))
                .andExpect(jsonPath("$.components").doesNotExist());
        mvc.perform(get("/actuator/env")).andExpect(status().isNotFound());
    }
}
