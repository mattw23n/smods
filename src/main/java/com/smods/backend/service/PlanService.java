package com.smods.backend.service;

import com.smods.backend.model.Plan;
import com.smods.backend.model.PlanModuleGPA;
import com.smods.backend.model.composite_key.PlanKey;
import com.smods.backend.model.composite_key.PlanModuleGPAKey;
import com.smods.backend.repository.PlanModuleGPARepository;
import com.smods.backend.repository.PlanRepository;
import com.smods.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlanService {

    private final PlanRepository planRepository;
    private final PlanModuleGPARepository planModuleGPARepository;
    private final UserRepository userRepository;

    @Autowired
    public PlanService(PlanRepository planRepository, PlanModuleGPARepository planModuleGPARepository, UserRepository userRepository) {
        this.planRepository = planRepository;
        this.planModuleGPARepository = planModuleGPARepository;
        this.userRepository = userRepository;
    }

    public List<Plan> getAllPlansByUser(Long userId) {
        return planRepository.findByUser(userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found")));
    }

    public Plan createPlan(Long userId, Plan plan) {
        plan.setUser(userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found")));
        return planRepository.save(plan);
    }

    public PlanModuleGPA addModule(Long planId, Long userId, String moduleId, int term) {
        PlanKey planKey = new PlanKey(planId, userId);
        planRepository.findById(planKey)
                .orElseThrow(() -> new RuntimeException("Plan not found"));

        PlanModuleGPAKey id = new PlanModuleGPAKey(planKey, moduleId);

        // Check if the module already exists in the plan
        boolean moduleExists = planModuleGPARepository.existsById(id);
        if (moduleExists) {
            throw new RuntimeException("Module already exists in the plan");
        }

        // Add methods to validate pre-requisites, co-requisites, mutually exclusive
        // before saving the module
        PlanModuleGPA planModuleGPA = new PlanModuleGPA();
        planModuleGPA.setTerm(term);
        return planModuleGPARepository.save(planModuleGPA);
    }
}
