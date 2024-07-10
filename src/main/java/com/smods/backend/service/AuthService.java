package com.smods.backend.service;

import com.smods.backend.dto.LoginRequest;
import com.smods.backend.dto.UserDTO;
import com.smods.backend.enums.LoginStatus;
import com.smods.backend.exception.EmailAlreadyExistsException;
import com.smods.backend.exception.InvalidCharacterException;
import com.smods.backend.exception.UserNotFoundException;
import com.smods.backend.exception.UsernameAlreadyExistsException;
import com.smods.backend.exception.VerificationTokenNotFoundException;
import com.smods.backend.model.User;
import com.smods.backend.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.UUID;
import java.util.regex.Pattern;

@Service
public class AuthService {

    private static final Pattern NON_ENGLISH_PATTERN = Pattern.compile("[^\\p{ASCII}]");
    private static final long TOKEN_EXPIRY_DURATION = 1000 * 60 * 60 * 24; // 24 hours

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final UserService userService;

    @Autowired
    public AuthService(UserRepository userRepository, EmailService emailService, UserService userService) {
        this.userRepository = userRepository;
        this.emailService = emailService;
        this.passwordEncoder = new BCryptPasswordEncoder();
        this.userService = userService;
    }

    public LoginStatus loginUser(LoginRequest loginRequest) {
        User user = userService.findByUsername(loginRequest.getUsername()).orElse(null);
        if (user == null || !passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return LoginStatus.INVALID_CREDENTIALS;
        }
        if (!user.getEmailVerified()) {
            return LoginStatus.EMAIL_NOT_VERIFIED;
        }
        return LoginStatus.SUCCESS;
    }

    public User registerUser(UserDTO userDTO) {
        validateInput(userDTO);

        if (userRepository.findByUsername(userDTO.getUsername()).isPresent()) {
            throw new UsernameAlreadyExistsException("Username already exists: " + userDTO.getUsername());
        }

        if (userRepository.findByEmail(userDTO.getEmail()).isPresent()) {
            throw new EmailAlreadyExistsException("Email already exists: " + userDTO.getEmail());
        }

        User user = new User(userDTO.getUsername(), passwordEncoder.encode(userDTO.getPassword()),
                userDTO.getEmail(), "USER");
        user.setEmailVerified(false);
        user.setVerificationToken(generateVerificationToken());
        user.setTokenExpiryDate(new Date(System.currentTimeMillis() + TOKEN_EXPIRY_DURATION));

        if (userDTO.getAdmissionYear() != null) {
            user.setAdmissionYear(userDTO.getAdmissionYear());
        }

        if (userDTO.getDegree() != null) {
            user.setDegree(userDTO.getDegree());
        }

        emailService.sendVerificationEmail(user);
        return userRepository.save(user);
    }

    @Transactional
    public void resendVerificationToken(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        user.setVerificationToken(generateVerificationToken());
        user.setTokenExpiryDate(new Date(System.currentTimeMillis() + TOKEN_EXPIRY_DURATION));

        emailService.sendVerificationEmail(user);
    }

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

    private void validateInput(UserDTO userDTO) {
        if (NON_ENGLISH_PATTERN.matcher(userDTO.getUsername()).find()) {
            throw new InvalidCharacterException("Username contains invalid characters.");
        }

        if (NON_ENGLISH_PATTERN.matcher(userDTO.getEmail()).find()) {
            throw new InvalidCharacterException("Email contains invalid characters.");
        }
    }

    private String generateVerificationToken() {
        return UUID.randomUUID().toString();
    }
}