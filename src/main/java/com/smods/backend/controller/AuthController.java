package com.smods.backend.controller;

import com.smods.backend.dto.LoginRequest;
import com.smods.backend.dto.UserDTO;
import com.smods.backend.enums.LoginStatus;
import com.smods.backend.exception.UserNotFoundException;
import com.smods.backend.model.User;
import com.smods.backend.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        LoginStatus loginStatus = userService.loginUser(loginRequest);
        switch (loginStatus) {
            case SUCCESS:
                return ResponseEntity.ok(loginStatus.getMessage());
            case EMAIL_NOT_VERIFIED:
                return ResponseEntity.status(403).body(loginStatus.getMessage());
            case INVALID_CREDENTIALS:
                return ResponseEntity.status(401).body(loginStatus.getMessage());
            default:
                throw new IllegalStateException("Unexpected value: " + loginStatus);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody @Valid UserDTO userDTO) {
        User user = userService.registerUser(userDTO);
        if (user != null) {
            return ResponseEntity.ok("Registration successful");
        } else {
            return ResponseEntity.status(400).body("Registration failed");
        }
    }

    @GetMapping("/verify")
    public ResponseEntity<String> verifyEmail(@RequestParam String token) {
        try {
            userService.verifyUser(token);
            return ResponseEntity.ok("Email verified successfully.");
        } catch (RuntimeException e) {
            return ResponseEntity.status(400).body(e.getMessage());
        }
    }

    @PostMapping("/resend-verification")
    public ResponseEntity<String> resendVerificationToken(@RequestParam String email) {
        try {
            userService.resendVerificationToken(email);
            return ResponseEntity.ok("Verification email sent");
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User with email " + email + " not found.");
        }
    }
}

