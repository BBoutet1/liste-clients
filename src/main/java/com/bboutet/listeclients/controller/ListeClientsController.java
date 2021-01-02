package com.bboutet.listeclients.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.bboutet.listeclients.model.Client;
import com.bboutet.listeclients.repo.ClientRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


//Controller
@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class ListeClientsController {
	@Autowired
	ClientRepository clientRepository;

	@GetMapping("/clients")
		public ResponseEntity<List<Client>> getAllClients(@RequestParam(required = false) String name) {
		try {
			List<Client> clients = new ArrayList<Client>();

			if (name == null)
				clientRepository.findAll().forEach(clients::add);

			if (clients.isEmpty()) {
				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
			}

			return new ResponseEntity<>(clients, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// @GetMapping("/clients/{id}")
	// public ResponseEntity<Client> getClientById(@PathVariable("id") long id) {
	// 	Optional<Client> clientData = clientRepository.findById(id);

	// 	if (clientData.isPresent()) {
	// 		return new ResponseEntity<>(clientData.get(), HttpStatus.OK);
	// 	} else {
	// 		return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	// 	}
	// }

	@PostMapping("/clients")
	public ResponseEntity<Client> createClient(@RequestBody Client client) {
		try {
			Client _client = clientRepository
					.save(new Client(client.getLastname(), client.getFirstname(), client.getPhone()));
			return new ResponseEntity<>(_client, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/clients/{id}")
	public ResponseEntity<Client> updateClient(@PathVariable("id") long id, @RequestBody Client client) {
		Optional<Client> clientData = clientRepository.findById(id);

		if (clientData.isPresent()) {
			Client _client = clientData.get();
			_client.setLastname(client.getLastname());
			_client.setFirstname(client.getFirstname());
			_client.setPhone(client.getPhone());
			return new ResponseEntity<>(clientRepository.save(_client), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/clients/{id}")
	public ResponseEntity<HttpStatus> deleteClient(@PathVariable("id") Long id) {
		try {
			clientRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// @DeleteMapping("/clients")
	// public ResponseEntity<HttpStatus> deleteAllClients() {
	// 	try {
	// 		clientRepository.deleteAll();
	// 		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	// 	} catch (Exception e) {
	// 		return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	// 	}

	// }

}
