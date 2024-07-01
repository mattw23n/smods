package com.smods.backend.repository;

import com.smods.backend.model.Plan;
import com.smods.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PlanRepository extends JpaRepository<Plan, Long> {
    List<Plan> findByUser(User user);
}
