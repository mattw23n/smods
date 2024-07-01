package com.smods.backend.model.composite_key;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class PlanModulePreassignedGpaKey implements Serializable {

    private Long uid;
    private Long pid;
    private String mid;

    // Default constructor
    public PlanModulePreassignedGpaKey() {}

    // Constructor with parameters
    public PlanModulePreassignedGpaKey(Long uid, Long pid, String mid) {
        this.uid = uid;
        this.pid = pid;
        this.mid = mid;
    }

    // Getters and Setters
    public Long getUid() {
        return uid;
    }

    public void setUid(Long uid) {
        this.uid = uid;
    }

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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PlanModulePreassignedGpaKey that = (PlanModulePreassignedGpaKey) o;
        return Objects.equals(uid, that.uid) &&
                Objects.equals(pid, that.pid) &&
                Objects.equals(mid, that.mid);
    }

    @Override
    public int hashCode() {
        return Objects.hash(uid, pid, mid);
    }

    @Override
    public String toString() {
        return "PlanModulePreassignedGpaKey{" +
                "uid=" + uid +
                ", pid=" + pid +
                ", mid='" + mid + '\'' +
                '}';
    }
}
