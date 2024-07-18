package com.smods.backend.controller;

import com.smods.backend.dto.ContactForm;
import com.smods.backend.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/contact")
public class ContactController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/send")
    public ResponseEntity<String> sendContactMessage(@RequestBody ContactForm contactForm) {
        emailService.sendContactFormMessage(contactForm.getName(), contactForm.getEmail(), contactForm.getMessage());
        return ResponseEntity.ok("Message sent successfully");
    }
}
