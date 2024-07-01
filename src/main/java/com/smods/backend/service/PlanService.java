package com.smods.backend.service;

import com.smods.backend.model.Plan;
import com.smods.backend.model.User;
import com.smods.backend.repository.PlanRepository;
import com.smods.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlanService {

    @Autowired
    private PlanRepository planRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Plan> getAllPlansByUser(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return planRepository.findByUser(user);
    }

    public Plan createPlan(Long userId, Plan plan) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        plan.setUser(user);
        return planRepository.save(plan);
    }
}
