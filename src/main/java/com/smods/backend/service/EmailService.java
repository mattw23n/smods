package com.smods.backend.service;

import com.smods.backend.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Autowired
    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendVerificationEmail(User user) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject("Email Verification");
        String verificationUrl = "http://localhost:8080/api/auth/verify?token=" + user.getVerificationToken();
        message.setText("Dear " + user.getUsername() + ",\n\nPlease verify your email using the following link: \n" + verificationUrl + "\n\nThis link will expire in 24 hours.\n\nThank you,\nSMODS");
        mailSender.send(message);
    }

    public void sendPasswordResetEmail(User user, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject("Password Reset Request");
<<<<<<< HEAD
        String resetUrl = "http://localhost:8080/reset-password?token=" + token;
=======
        String resetUrl = "http://localhost:8080/api/auth/redirect-reset-password?token=" + token;
>>>>>>> a87d4d024f7e053f41194b494a747aff6066f581
        message.setText("Dear " + user.getUsername() + ",\n\nTo reset your password, please use the following link: \n" + resetUrl + "\n\nThis link will expire in 24 hours.\n\nThank you,\nSMODS");
        mailSender.send(message);
    }
}