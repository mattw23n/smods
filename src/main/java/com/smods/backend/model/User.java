package com.smods.backend.model;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private String password;
    private String email;
    private String role;

    private boolean emailVerified;
    private String verificationCode;

    @ElementCollection
    private Set<String> major = new HashSet<>();

    @ElementCollection
    private Set<String> track = new HashSet<>();

    @ManyToMany
    @JoinTable(
            name = "user_modules",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "module_id")
    )
    private Set<Module> mods = new HashSet<>();

    public User() {
        // Default constructor for JPA
    }

    public User(String username, String password, String email, String role) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = role;
        this.emailVerified = false;
    }

    // Getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

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

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public boolean isEmailVerified() {
        return emailVerified;
    }

    public void setEmailVerified(boolean emailVerified) {
        this.emailVerified = emailVerified;
    }

    public String getVerificationCode() {
        return verificationCode;
    }

    public void setVerificationCode(String verificationCode) {
        this.verificationCode = verificationCode;
    }

    public Set<String> getMajor() {
        return major;
    }

    public void setMajor(Set<String> major) {
        this.major = major;
    }

    public Set<String> getTrack() {
        return track;
    }

    public void setTrack(Set<String> track) {
        this.track = track;
    }

    public Set<Module> getMods() {
        return mods;
    }

    public void setMods(Set<Module> mods) {
        this.mods = mods;
    }

    public void addMod(Module mod) {
        this.mods.add(mod);
    }
}