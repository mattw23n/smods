package com.smods.backend.service;

import com.smods.backend.model.Plan;
import com.smods.backend.model.PlanModuleGpa;
import com.smods.backend.model.composite_key.PlanModuleGpaKey;
import com.smods.backend.repository.PlanModuleGpaRepository;
import com.smods.backend.repository.PlanRepository;
import com.smods.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlanService {

    private final PlanRepository planRepository;
    private final PlanModuleGpaRepository planModuleGpaRepository;
    private final UserRepository userRepository;

    @Autowired
    public PlanService(PlanRepository planRepository, PlanModuleGpaRepository planModuleGpaRepository, UserRepository userRepository) {
        this.planRepository = planRepository;
        this.planModuleGpaRepository = planModuleGpaRepository;
        this.userRepository = userRepository;
    }

    public List<Plan> getAllPlansByUser(Long userId) {
        return planRepository.findByUser(userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found")));
    }

    public Plan createPlan(Long userId, Plan plan) {
        plan.setUser(userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found")));
        return planRepository.save(plan);
    }

    public PlanModuleGpa addModule(Long planId, String moduleId, String term) {
        Plan plan = planRepository.findById(planId).orElseThrow(() -> new RuntimeException("Plan not found"));
        Long uid = plan.getUser().getId();

        PlanModuleGpaKey id = new PlanModuleGpaKey(uid, planId, moduleId);

        PlanModuleGpa planModuleGpa = planModuleGpaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Plan module not found"));

        // Add methods to validate pre-requisites, co-requisites, mutually exclusive
        // before saving the module
        planModuleGpa.setTerm(term);
        return planModuleGpaRepository.save(planModuleGpa);
    }
}
