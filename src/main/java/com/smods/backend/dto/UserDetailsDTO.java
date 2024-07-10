package com.smods.backend.dto;

import com.smods.backend.model.Plan;
import java.util.List;

public class UserDetailsDTO {

    private String username;
    private String email;
    private String password;
    private List<Plan> plans;

    public UserDetailsDTO(String username, String email, String password, List<Plan> plans) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.plans = plans;
    }

    // Getters and setters

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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public List<Plan> getPlans() {
        return plans;
    }

    public void setPlans(List<Plan> plans) {
        this.plans = plans;
    }
}