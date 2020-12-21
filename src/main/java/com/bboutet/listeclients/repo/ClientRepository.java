package com.bboutet.listeclients.repo;

import com.bboutet.listeclients.model.Client;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ClientRepository extends JpaRepository <Client, Long> {
    Client findByLastName(String lastName);
}
