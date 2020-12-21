package com.bboutet.listeclients.service;


import com.bboutet.listeclients.repo.ClientRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class ClientService {
    private final ClientRepository clientRepository;
    private ClientService clientService;

    @Autowired
    public ClientService(ClientRepository clientRepository, ClientService clientService) {
        this.clientRepository = clientRepository;
        this.clientService = clientService;
    }

}