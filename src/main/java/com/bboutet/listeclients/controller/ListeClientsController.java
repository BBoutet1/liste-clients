package com.bboutet.listeclients.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import antlr.collections.List;
import ch.qos.logback.core.net.server.Client;

//Controller
@RestController
@RequestMapping("/api")
public class ListeClientsController {
   @Autowired
	private ClientService cliensservice;
	
	@GetMapping("/clients")
	public List<Client> get() {
		return clientService.get();
	}
	
	@PostMapping("/client")
	public Client save(@RequestBody Employee employee) {
		employeeService.save(employee);
		return employee;
	}
	
	@GetMapping("/employee/{id}")
	public Employee get(@PathVariable int id) {
		return employeeService.get(id);
	}
	
	@DeleteMapping("/employee/{id}")
	public String delete(@PathVariable int id) {
		
		employeeService.delete(id);
		
		return "Employee removed with id "+id;
		
	}
	
	@PutMapping("/employee")
	public Employee update(@RequestBody Employee employee) {
		employeeService.save(employee);
		return employee;
	}
    
}
