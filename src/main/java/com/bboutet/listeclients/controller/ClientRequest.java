package com.bboutet.listeclients.controller;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record ClientRequest(
        @NotBlank(message = "Le nom est obligatoire.")
        @Size(max = 30, message = "Le nom doit contenir au plus 30 caractères.") String lastname,
        @Size(max = 30, message = "Le prénom doit contenir au plus 30 caractères.") String firstname,
        @Pattern(regexp = "(?:[0-9]{10})?", message = "Le téléphone doit être vide ou contenir 10 chiffres.")
        String phone) {
}
