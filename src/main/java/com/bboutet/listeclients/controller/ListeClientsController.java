package com.bboutet.listeclients.controller;

import java.net.URI;
import java.util.List;

import com.bboutet.listeclients.model.Client;
import com.bboutet.listeclients.repo.ClientRepository;
import jakarta.validation.Valid;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/clients")
public class ListeClientsController {
    private final ClientRepository clientRepository;

    public ListeClientsController(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }

    @GetMapping
    public List<Client> getAllClients(@RequestParam(required = false) String name) {
        Sort order = Sort.by("id");
        return name == null || name.isBlank()
                ? clientRepository.findAll(order)
                : clientRepository.findByLastnameContainingIgnoreCase(name.trim(), order);
    }

    @GetMapping("/{id}")
    public Client getClientById(@PathVariable long id) {
        return findClient(id);
    }

    @PostMapping
    public ResponseEntity<Client> createClient(@Valid @RequestBody ClientRequest request) {
        Client client = clientRepository.save(new Client(
                request.lastname().trim(), optionalText(request.firstname()), optionalText(request.phone())));
        return ResponseEntity.created(URI.create("/api/clients/" + client.getId())).body(client);
    }

    @PutMapping("/{id}")
    public Client updateClient(@PathVariable long id, @Valid @RequestBody ClientRequest request) {
        Client client = findClient(id);
        client.setLastname(request.lastname().trim());
        client.setFirstname(optionalText(request.firstname()));
        client.setPhone(optionalText(request.phone()));
        return clientRepository.save(client);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteClient(@PathVariable long id) {
        clientRepository.delete(findClient(id));
        return ResponseEntity.noContent().build();
    }

    private Client findClient(long id) {
        return clientRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Client introuvable."));
    }

    private static String optionalText(String value) {
        return value == null ? "" : value.trim();
    }
}
