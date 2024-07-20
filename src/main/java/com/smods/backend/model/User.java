package com.smods.backend.model;

import com.smods.backend.model.Module;
import jakarta.persistence.Entity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.time.Year;
import java.util.Date;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "USERS")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "USER_ID", nullable = false, unique = true)
    private Long userId;

    @Column(name = "USERNAME", nullable = false, unique = true, length = 16)
    private String username;

    @Column(name = "PASSWORD", nullable = false)
    private String password;

    @Column(name = "EMAIL", nullable = false, unique = true)
    private String email;

    @Column(name = "ROLE", nullable = false)
    private String role;

    @Column(name = "EMAIL_VERIFIED")
    private Boolean emailVerified;

    @Column(name = "VERIFICATION_TOKEN", unique = true)
    private String verificationToken;

    @Column(name = "VERIFICATION_TOKEN_EXPIRY_DATE")
    private Date tokenExpiryDate;

    @Column(name = "PASSWORD_RESET_TOKEN", unique = true)
    private String passwordResetToken;

    @Column(name = "PASSWORD_RESET_TOKEN_EXPIRY_DATE")
    private Date passwordResetTokenExpiryDate;

    @Column(name = "ADMISSION_YEAR")
    private Year admissionYear;

    @Column(name = "DEGREE")
    private String degree;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    @JsonManagedReference(value = "user-plan")
    private List<Plan> plans;

    public User() {
    }

    public User(String username, String password, String email, String role) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.role = role;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
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

    public Boolean getEmailVerified() {
        return emailVerified;
    }

    public void setEmailVerified(Boolean emailVerified) {
        this.emailVerified = emailVerified;
    }

    public String getVerificationToken() {
        return verificationToken;
    }

    public void setVerificationToken(String verificationToken) {
        this.verificationToken = verificationToken;
    }

    public Date getTokenExpiryDate() {
        return tokenExpiryDate;
    }

    public void setTokenExpiryDate(Date tokenExpiryDate) {
        this.tokenExpiryDate = tokenExpiryDate;
    }

    public String getPasswordResetToken() {
        return passwordResetToken;
    }

    public void setPasswordResetToken(String passwordResetToken) {
        this.passwordResetToken = passwordResetToken;
    }

    public Date getPasswordResetTokenExpiryDate() {
        return passwordResetTokenExpiryDate;
    }

    public void setPasswordResetTokenExpiryDate(Date passwordResetTokenExpiryDate) {
        this.passwordResetTokenExpiryDate = passwordResetTokenExpiryDate;
    }

    public Year getAdmissionYear() {
        return admissionYear;
    }

    public void setAdmissionYear(Year admissionYear) {
        this.admissionYear = admissionYear;
    }

    public String getDegree() {
        return degree;
    }

    public void setDegree(String degree) {
        this.degree = degree;
    }

    public List<Plan> getPlans() {
        return plans;
    }

    public void setPlans(List<Plan> plans) {
        this.plans = plans;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(userId, user.userId) && Objects.equals(username, user.username) && Objects.equals(password, user.password) && Objects.equals(email, user.email) && Objects.equals(role, user.role) && Objects.equals(emailVerified, user.emailVerified) && Objects.equals(verificationToken, user.verificationToken) && Objects.equals(tokenExpiryDate, user.tokenExpiryDate) && Objects.equals(passwordResetToken, user.passwordResetToken) && Objects.equals(passwordResetTokenExpiryDate, user.passwordResetTokenExpiryDate) && Objects.equals(admissionYear, user.admissionYear) && Objects.equals(degree, user.degree) && Objects.equals(plans, user.plans);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, username, password, email, role, emailVerified, verificationToken, tokenExpiryDate, passwordResetToken, passwordResetTokenExpiryDate, admissionYear, degree, plans);
    }

    @Override
    public String toString() {
        return "User{" +
                "userId=" + userId +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", email='" + email + '\'' +
                ", role='" + role + '\'' +
                ", emailVerified=" + emailVerified +
                ", verificationToken='" + verificationToken + '\'' +
                ", tokenExpiryDate=" + tokenExpiryDate +
                ", passwordResetToken='" + passwordResetToken + '\'' +
                ", passwordResetTokenExpiryDate=" + passwordResetTokenExpiryDate +
                ", admissionYear=" + admissionYear +
                ", degree='" + degree + '\'' +
                ", plans=" + plans +
                '}';
    }
>>>>>>> 4b2c7ba06db6b1a6c2f8a55e3ded14ce6856d97c
}