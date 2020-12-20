package com.bboutet.listeclients;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

//Controller
@RestController
public class ListeClientsController {
    //GET
    //URI -/hello-clients
    //method - "Hello Clients"

    @GetMapping(path = "/hello-clients")
    // public static void main(String[] args)
    public String HelloClients() {
        return "Hello Mbolo Clients";
    }
    
}
