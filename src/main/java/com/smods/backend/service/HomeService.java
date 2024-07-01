package com.smods.backend.service;

import org.springframework.stereotype.Service;

@Service
public class HomeService {

    public String getWelcomeMessage() {
        return "(☞ﾟヮﾟ)☞ welcome to smods ☜(ﾟヮﾟ☜)<br>".repeat(69);
    }

    public String getSummary() {
        // Replace with actual summary fetching logic
        return "This is the summary content for SMODS.";
    }

    public String getAboutUs() {
        // Replace with actual fetching logic if needed
        return "About Us content for SMODS.";
    }

    public String getContactUs() {
        // Replace with actual fetching logic if needed
        return "Contact Us content for SMODS.";
    }

    public String planNow() {
        // Replace with actual logic for plan creation initialization
        return "Start planning your academic modules now!";
    }

    public String login() {
        // Replace with actual login redirection logic
        return "Please navigate to the login page to log in.";
    }

    public String register() {
        // Replace with actual registration redirection logic
        return "Please navigate to the registration page to create an account.";
    }
}
