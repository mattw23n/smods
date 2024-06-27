package com.smods.backend.model;

import jakarta.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class PlanModuleId implements Serializable {
    private Integer pid;
    private String cid;

    public Integer getPid() {
        return pid;
    }

    public void setPid(Integer pid) {
        this.pid = pid;
    }

    public String getCid() {
        return cid;
    }

    public void setCid(String cid) {
        this.cid = cid;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PlanModuleId that = (PlanModuleId) o;
        return Objects.equals(pid, that.pid) && Objects.equals(cid, that.cid);
    }

    @Override
    public int hashCode() {
        return Objects.hash(pid, cid);
    }
}
