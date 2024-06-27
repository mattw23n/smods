package com.smods.backend.model.composite_key;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class PlanModuleGpaKey implements Serializable {
    @Column(name = "PID")
    private Long pid;

    @Column(name = "MID")
    private String mid;

    // Default constructor
    public PlanModuleGpaKey() {}

    // Constructor with parameters
    public PlanModuleGpaKey(Long pid, String mid) {
        this.pid = pid;
        this.mid = mid;
    }

    // Getters and Setters
    public Long getPid() {
        return pid;
    }

    public void setPid(Long pid) {
        this.pid = pid;
    }

    public String getMid() {
        return mid;
    }

    public void setMid(String mid) {
        this.mid = mid;
    }

    // Override equals and hashCode
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PlanModuleGpaKey that = (PlanModuleGpaKey) o;
        return Objects.equals(pid, that.pid) && Objects.equals(mid, that.mid);
    }

    @Override
    public int hashCode() {
        return Objects.hash(pid, mid);
    }
}
