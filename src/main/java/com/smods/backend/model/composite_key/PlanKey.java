package com.smods.backend.model.composite_key;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class PlanKey implements Serializable {
    @Column(name = "PLAN_ID", nullable = false)
    private Long planId;

    @Column(name = "USER_ID", nullable = false)
    private Long userId;

    public PlanKey() {}

    public PlanKey(Long planId, Long userId) {
        this.planId = planId;
        this.userId = userId;
    }

    public Long getPlanId() {
        return planId;
    }

    public void setPlanId(Long planId) {
        this.planId = planId;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        PlanKey planKey = (PlanKey) o;
        return Objects.equals(planId, planKey.planId) && Objects.equals(userId, planKey.userId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(planId, userId);
    }
}
