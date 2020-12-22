package com.bboutet.listeclients.controller;

import java.util.ArrayList;
import java.util.List;

import com.bboutet.listeclients.repo.ClientRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import ch.qos.logback.core.net.server.Client;

//Controller
@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/api")
public class ListeClientsController {
	@Autowired
	ClientRepository clientRepository;

	@GetMapping("/clients")
	public ResponseEntity<List<Client>> getAllClients() {
		try {
			List<Client> clients = new ArrayList<Client>();
			return new ResponseEntity<>(clients, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
