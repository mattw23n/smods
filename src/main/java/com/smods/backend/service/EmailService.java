package com.smods.backend.service;

import com.smods.backend.model.User;
import io.github.cdimascio.dotenv.Dotenv;
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
        String verificationUrl = "http://52.221.189.77:8080/api/auth/verify?token=" + user.getVerificationToken();
        message.setText("Dear " + user.getUsername() + ",\n\nPlease verify your email using the following link: \n" + verificationUrl + "\n\nThis link will expire in 24 hours.\n\nThank you,\nSMODS");
        mailSender.send(message);
    }

    public void sendPasswordResetEmail(User user, String token) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject("Password Reset Request");

        String resetUrl = "http://52.221.189.77:8080/api/auth/redirect-reset-password?token=" + token;
        message.setText("Dear " + user.getUsername() + ",\n\nTo reset your password, please use the following link: \n" + resetUrl + "\n\nThis link will expire in 24 hours.\n\nThank you,\nSMODS");
        mailSender.send(message);
    }

    public void sendContactFormMessage(String name, String email, String messageContent) {
        SimpleMailMessage message = new SimpleMailMessage();
        Dotenv dotenv = Dotenv.load();
        message.setTo(dotenv.get("EMAIL_USERNAME"));
        message.setSubject("New Contact Form Submission from " + name);
        message.setText("Name: " + name + "\nEmail: " + email + "\n\nMessage:\n" + messageContent);
        mailSender.send(message);
    }
}