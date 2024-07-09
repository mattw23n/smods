package com.smods.backend.controller;

import com.smods.backend.dto.LoginRequest;
import com.smods.backend.dto.UserDTO;
import com.smods.backend.enums.LoginStatus;
import com.smods.backend.exception.UserNotFoundException;
import com.smods.backend.model.User;
import com.smods.backend.service.UserService;
import com.smods.backend.util.JwtUtil;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest loginRequest) {
        UserDetails userDetails;
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword())
            );
            userDetails = userDetailsService.loadUserByUsername(loginRequest.getUsername());
        } catch (Exception e) {
            return ResponseEntity.status(401).body("Invalid username or password.");
        }

        final String jwt = jwtUtil.generateToken(userDetails);

        if (!userDetails.isAccountNonLocked()) {
            return ResponseEntity.status(403).body("Please verify your email");
        }

        return ResponseEntity.ok(jwt);
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