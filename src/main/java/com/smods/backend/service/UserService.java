package com.smods.backend.service;

import com.smods.backend.dto.LoginRequest;
import com.smods.backend.dto.UserDTO;
import com.smods.backend.enums.LoginStatus;
import com.smods.backend.exception.*;
import com.smods.backend.model.User;
import com.smods.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;
import java.util.UUID;
import java.util.regex.Pattern;

@Service
public class UserService {

    private static final Pattern NON_ENGLISH_PATTERN = Pattern.compile("[^\\p{ASCII}]");
    private static final long TOKEN_EXPIRY_DURATION = 1000 * 60 * 60 * 24; // 24 hours

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;

    @Autowired
    public UserService(UserRepository userRepository, EmailService emailService) {
        this.userRepository = userRepository;
        this.emailService = emailService;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    // Register a new user
    public User registerUser(UserDTO userDTO) {
        validateInput(userDTO);

        // Check if username already exists
        if (userRepository.findByUsername(userDTO.getUsername()).isPresent()) {
            throw new UsernameAlreadyExistsException("Username already exists: " + userDTO.getUsername());
        }

        // Check if email already exists
        if (userRepository.findByEmail(userDTO.getEmail()).isPresent()) {
            throw new EmailAlreadyExistsException("Email already exists: " + userDTO.getEmail());
        }

        User user = new User(userDTO.getUsername(), passwordEncoder.encode(userDTO.getPassword()),
                userDTO.getEmail(), "USER");
        user.setEmailVerified(false);
        user.setVerificationToken(generateVerificationToken());
        user.setTokenExpiryDate(new Date(System.currentTimeMillis() + TOKEN_EXPIRY_DURATION));

        // Send verification email
        emailService.sendVerificationEmail(user);

        return userRepository.save(user);
    }

    private void validateInput(UserDTO userDTO) {
        if (NON_ENGLISH_PATTERN.matcher(userDTO.getUsername()).find()) {
            throw new InvalidCharacterException("Username contains invalid characters.");
        }

        if (NON_ENGLISH_PATTERN.matcher(userDTO.getEmail()).find()) {
            throw new InvalidCharacterException("Email contains invalid characters.");
        }

        // You can add more validation rules here as necessary
    }

    private String generateVerificationToken() {
        return UUID.randomUUID().toString();
    }

    @Transactional
    public void resendVerificationToken(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        user.setVerificationToken(generateVerificationToken());
        user.setTokenExpiryDate(new Date(System.currentTimeMillis() + TOKEN_EXPIRY_DURATION));

        // Send verification email
        emailService.sendVerificationEmail(user);
    }

    // Verify the user's email
    public void verifyUser(String verificationToken) {
        User user = userRepository.findByVerificationToken(verificationToken)
                .orElseThrow(() -> new VerificationTokenNotFoundException("Invalid verification token"));

        if (user.getTokenExpiryDate().before(new Date())) {
            throw new VerificationTokenNotFoundException("Verification token has expired");
        }

        user.setEmailVerified(true);
        user.setVerificationToken(null);
        user.setTokenExpiryDate(null);
        userRepository.save(user);
    }

    // Find a user by username
    public User findByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }

    // Login a user
    public LoginStatus loginUser(LoginRequest loginRequest) {
        User user = findByUsername(loginRequest.getUsername());
        if (user == null || !passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return LoginStatus.INVALID_CREDENTIALS;
        }
        if (!user.getEmailVerified()) {
            return LoginStatus.EMAIL_NOT_VERIFIED;
        }
        return LoginStatus.SUCCESS;
    }

    // Update user details
    public User updateUser(Long id, UserDTO userDTO) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setUsername(userDTO.getUsername());
            user.setEmail(userDTO.getEmail());
            if (!userDTO.getPassword().isEmpty()) {
                user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
            }
            return userRepository.save(user);
        } else {
            throw new RuntimeException("User not found with id: " + id);
        }
    }

    // Find user by ID
    public User findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }
}
