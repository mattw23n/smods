package com.smods.backend.controller;

import com.smods.backend.dto.JwtResponse;
import com.smods.backend.dto.LoginRequest;
import com.smods.backend.dto.PasswordResetRequest;
import com.smods.backend.dto.RefreshTokenRequest;
import com.smods.backend.dto.UserDTO;
import com.smods.backend.enums.LoginStatus;
import com.smods.backend.exception.UserNotFoundException;
import com.smods.backend.model.User;
import com.smods.backend.service.AuthService;
import com.smods.backend.service.UserService;
import com.smods.backend.util.JwtUtil;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

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
    private AuthService authService;

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        LoginStatus loginStatus = authService.loginUser(loginRequest);

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

        User user = userService.findByUsernameOrEmail(loginRequest.getUsername()).orElse(null);
        if (user == null) {
            return ResponseEntity.status(401).body("Invalid credentials");
        }

        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails);
        final String refreshToken = jwtUtil.generateRefreshToken(userDetails);

        return ResponseEntity.ok(new JwtResponse(jwt, refreshToken, userDetails.getUsername(), user.getUserId()));
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@RequestBody RefreshTokenRequest refreshTokenRequest) {
        try {
            String refreshToken = refreshTokenRequest.getRefreshToken();
            String username = jwtUtil.extractUsername(refreshToken);
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            if (jwtUtil.validateToken(refreshToken, userDetails)) {
                final String jwt = jwtUtil.generateToken(userDetails);
                final String newRefreshToken = jwtUtil.generateRefreshToken(userDetails);

                User user = userService.findByUsernameOrEmail(username).orElseThrow(() -> new RuntimeException("User not found"));

                return ResponseEntity.ok(new JwtResponse(jwt, newRefreshToken, username, user.getUserId()));
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid refresh token");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid refresh token");
        }
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody @Valid UserDTO userDTO) {
        User user = authService.registerUser(userDTO);
        if (user != null) {
            return ResponseEntity.ok("Registration successful");
        } else {
            return ResponseEntity.status(400).body("Registration failed");
        }
    }

    @GetMapping("/verify")
    public void verifyUser(@RequestParam("token") String verificationToken, HttpServletResponse response) throws IOException {
        User user = authService.verifyUser(verificationToken);

        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails);
        final String refreshToken = jwtUtil.generateRefreshToken(userDetails);

        // Redirect to the frontend with tokens as query parameters
        String redirectUrl = String.format("http://52.221.189.77/handle-verification?jwt=%s&refreshToken=%s&username=%s", jwt, refreshToken, userDetails.getUsername());
        response.sendRedirect(redirectUrl);
    }


    @PostMapping("/resend-verification")
    public ResponseEntity<String> resendVerificationToken(@RequestParam String email) {
        try {
            authService.resendVerificationToken(email);
            return ResponseEntity.ok("Verification email sent");
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User with email " + email + " not found.");
        }
    }

    @PostMapping("/request-password-reset")
    public ResponseEntity<String> requestPasswordReset(@RequestParam String email) {
        try {
            authService.requestPasswordReset(email);
            return ResponseEntity.ok("Password reset email sent");
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("User with email " + email + " not found.");
        }
    }

    @GetMapping("/redirect-reset-password")
    public void redirectToResetPassword(@RequestParam("token") String token, HttpServletResponse response) throws IOException {
        String redirectUrl = "http://52.221.189.77/reset-password?token=" + token;
        response.sendRedirect(redirectUrl);
    }

    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestBody PasswordResetRequest passwordResetRequest) {
        try {
            authService.resetPassword(passwordResetRequest.getToken(), passwordResetRequest.getNewPassword());
            return ResponseEntity.ok("Password reset successfully");
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
