package com.smods.backend.controller;

import com.smods.backend.dto.JwtResponse;
import com.smods.backend.dto.LoginRequest;
import com.smods.backend.dto.RefreshTokenRequest;
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
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        LoginStatus loginStatus = userService.loginUser(loginRequest);

        if (loginStatus != LoginStatus.SUCCESS) {
            switch (loginStatus) {
                case EMAIL_NOT_VERIFIED:
                    return ResponseEntity.status(403).body(loginStatus.getMessage());
                case INVALID_CREDENTIALS:
                    return ResponseEntity.status(401).body(loginStatus.getMessage());
                default:
                    throw new IllegalStateException("Unexpected value: " + loginStatus);
            }
        }

        UserDetails userDetails = userDetailsService.loadUserByUsername(loginRequest.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails);
        final String refreshToken = jwtUtil.generateRefreshToken(userDetails);

        return ResponseEntity.ok(new JwtResponse(jwt, refreshToken, userDetails.getUsername()));
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@RequestBody  RefreshTokenRequest refreshTokenRequest) {
        try {
            String refreshToken = refreshTokenRequest.getRefreshToken();
            String username = jwtUtil.extractUsername(refreshToken);
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            if (jwtUtil.validateToken(refreshToken, userDetails)) {
                final String jwt = jwtUtil.generateToken(userDetails);
                final String newRefreshToken = jwtUtil.generateRefreshToken(userDetails);
                return ResponseEntity.ok(new JwtResponse(jwt, newRefreshToken, username));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid refresh token");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid refresh token");
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