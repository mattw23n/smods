package com.smods.backend.dto;

import java.util.List;

public class UserDetailsDTO {

    private Long userId;

    private String username;
    private String email;
    private String role;
    private List<PlanDTO> plans;

    public UserDetailsDTO(Long userId, String username, String email, String role, List<PlanDTO> plans) {
        this.userId = userId;
        this.username = username;
        this.email = email;
        this.role = role;
        this.plans = plans;
    }

    // Getters and setters

    public Long getUserId() { return userId; }

    public void setUserId(Long userId) { this.userId = userId; }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public List<PlanDTO> getPlans() {
        return plans;
    }

    public void setPlans(List<PlanDTO> plans) {
        this.plans = plans;
    }
}