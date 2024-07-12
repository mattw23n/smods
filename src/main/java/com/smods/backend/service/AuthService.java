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
import com.smods.backend.util.JwtUtil;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.regex.Pattern;

@Service
public class AuthService {

    private static final Pattern NON_ENGLISH_PATTERN = Pattern.compile("[^\\p{ASCII}]");
    private static final long TOKEN_EXPIRY_DURATION = 1000 * 60 * 60 * 24; // 24 hours
    private static final Pattern PASSWORD_PATTERN = Pattern.compile("^(?=.*[a-zA-Z])(?=.*\\d).{8,32}$");


    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final EmailService emailService;
    private final UserService userService;
    private final UserDetailsService userDetailsService;
    private final JwtUtil jwtUtil;


    @Autowired
    public AuthService(UserRepository userRepository, EmailService emailService, UserService userService, UserDetailsService userDetailsService, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.emailService = emailService;
        this.passwordEncoder = new BCryptPasswordEncoder();
        this.userService = userService;
        this.userDetailsService = userDetailsService;
        this.jwtUtil = jwtUtil;
    }

    public LoginStatus loginUser(LoginRequest loginRequest) {
        User user = userService.findByUsernameOrEmail(loginRequest.getUsername()).orElse(null);
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

        if (userRepository.findByEmail(userDTO.getEmail()).isPresent()) {
            throw new EmailAlreadyExistsException("Email already exists: " + userDTO.getEmail());
        }

        if (userRepository.findByUsername(userDTO.getUsername()).isPresent()) {
            throw new UsernameAlreadyExistsException("Username already exists: " + userDTO.getUsername());
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

    public User verifyUser(String verificationToken) {
        User user = userRepository.findByVerificationToken(verificationToken)
                .orElseThrow(() -> new VerificationTokenNotFoundException("Invalid verification token"));

        if (user.getTokenExpiryDate().before(new Date())) {
            throw new VerificationTokenNotFoundException("Verification token has expired");
        }

        user.setEmailVerified(true);
        user.setVerificationToken(null);
        user.setTokenExpiryDate(null);
        return userRepository.save(user);
    }

    public void requestPasswordReset(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User not found"));

        String token = generateVerificationToken();
        user.setPasswordResetToken(token);
        user.setPasswordResetTokenExpiryDate(new Date(System.currentTimeMillis() + TOKEN_EXPIRY_DURATION));
        userRepository.save(user);

        emailService.sendPasswordResetEmail(user, token);
    }

    public void resetPassword(String token, String newPassword) {
        User user = userRepository.findByPasswordResetToken(token)
                .orElseThrow(() -> new VerificationTokenNotFoundException("Invalid password reset token"));

        if (user.getPasswordResetTokenExpiryDate().before(new Date())) {
            throw new VerificationTokenNotFoundException("Password reset token has expired");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        user.setPasswordResetToken(null);
        user.setPasswordResetTokenExpiryDate(null);
        userRepository.save(user);
    }

    private User findByUsernameOrEmail(String identifier) {
        Optional<User> userOpt = userRepository.findByUsername(identifier);
        if (userOpt.isEmpty()) {
            userOpt = userRepository.findByEmail(identifier);
        }
        return userOpt.orElse(null);
    }

    private void validateInput(UserDTO userDTO) {
        if (userDTO.getEmail() == null || userDTO.getEmail().isBlank()) {
            throw new IllegalArgumentException("Email is required");
        }
        if (userDTO.getUsername() == null || userDTO.getUsername().isBlank()) {
            throw new IllegalArgumentException("Username is required");
        }
        if (userDTO.getPassword() == null || userDTO.getPassword().isBlank()) {
            throw new IllegalArgumentException("Password is required");
        }
        if (!userDTO.getEmail().matches("^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$")) {
            throw new IllegalArgumentException("Email should be valid");
        }
        if (NON_ENGLISH_PATTERN.matcher(userDTO.getEmail()).find()) {
            throw new InvalidCharacterException("Email contains invalid characters.");
        }
        if (userDTO.getUsername().length() < 3 || userDTO.getUsername().length() > 16) {
            throw new IllegalArgumentException("Username must be between 3 and 16 characters");
        }
        if (NON_ENGLISH_PATTERN.matcher(userDTO.getUsername()).find()) {
            throw new InvalidCharacterException("Username contains invalid characters.");
        }

        if (!PASSWORD_PATTERN.matcher(userDTO.getPassword()).matches()) {
            throw new InvalidCharacterException("Password must contain at least one letter and one number, and be between 8-32 characters long.");
        }
        if (NON_ENGLISH_PATTERN.matcher(userDTO.getPassword()).find()) {
            throw new InvalidCharacterException("Password contains invalid characters.");
        }
    }

    private String generateVerificationToken() {
        return UUID.randomUUID().toString();
    }

    public Map<String, String> verifyUserAndGenerateToken(String verificationToken) {
        User user = userRepository.findByVerificationToken(verificationToken)
                .orElseThrow(() -> new VerificationTokenNotFoundException("Invalid verification token"));

        if (user.getTokenExpiryDate().before(new Date())) {
            throw new VerificationTokenNotFoundException("Verification token has expired");
        }

        user.setEmailVerified(true);
        user.setVerificationToken(null);
        user.setTokenExpiryDate(null);
        userRepository.save(user);

        UserDetails userDetails = userDetailsService.loadUserByUsername(user.getUsername());
        final String jwt = jwtUtil.generateToken(userDetails);
        final String refreshToken = jwtUtil.generateRefreshToken(userDetails);

        Map<String, String> tokens = new HashMap<>();
        tokens.put("jwt", jwt);
        tokens.put("refreshToken", refreshToken);
        tokens.put("username", user.getUsername());
        return tokens;
    }

    public User getUserByVerificationToken(String verificationToken) {
        return userRepository.findByVerificationToken(verificationToken)
                .orElseThrow(() -> new VerificationTokenNotFoundException("Invalid verification token"));
    }
}
