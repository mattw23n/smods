package com.smods.backend.controller;

import com.smods.backend.service.HomeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/home")
public class HomeController {

    private final HomeService homeService;

    public HomeController(HomeService homeService) {
        this.homeService = homeService;
    }

    @GetMapping("/")
    public ResponseEntity<String> getWelcomeMessage() {
        return ResponseEntity.ok(homeService.getWelcomeMessage());
    }

    @GetMapping("/summary")
    public ResponseEntity<String> getSummary() {
        return ResponseEntity.ok(homeService.getSummary());
    }

    @GetMapping("/about")
    public ResponseEntity<String> getAboutUs() {
        return ResponseEntity.ok(homeService.getAboutUs());
    }

    @GetMapping("/contact")
    public ResponseEntity<String> getContactUs() {
        return ResponseEntity.ok(homeService.getContactUs());
    }

    @GetMapping("/plans")
    public ResponseEntity<String> planNow() {
        return ResponseEntity.ok(homeService.planNow());
    }

    @GetMapping("/login")
    public ResponseEntity<String> login() {
        return ResponseEntity.ok(homeService.login());
    }

    @GetMapping("/register")
    public ResponseEntity<String> register() {
        return ResponseEntity.ok(homeService.register());
    }
}
