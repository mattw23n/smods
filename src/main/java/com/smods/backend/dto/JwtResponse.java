package com.smods.backend.dto;

public class JwtResponse {
    private String token;
    private String refreshToken;
    private String type = "Bearer";
    private String username;

    private Long userId;

    public JwtResponse(String token, String refreshToken, String username, Long userId) {
        this.token = token;
        this.refreshToken = refreshToken;
        this.username = username;
        this.userId = userId;
    }

    // Getters and setters
    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}