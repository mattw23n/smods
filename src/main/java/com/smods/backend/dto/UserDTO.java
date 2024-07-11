package com.smods.backend.dto;

import java.time.Year;

public class UserDTO {

    private String username;
    private String password;
    private String email;
    private String degree;
    private Year admissionYear;

    // Getters and setters

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getDegree() {
        return degree;
    }

    public void setDegree(String degree) {
        this.degree = degree;
    }

    public Year getAdmissionYear() {
        return admissionYear;
    }

    public void setAdmissionYear(Year admissionYear) {
        this.admissionYear = admissionYear;
    }
}