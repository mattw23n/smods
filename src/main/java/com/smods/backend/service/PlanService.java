package com.smods.backend.service;

import com.smods.backend.model.Plan;
import com.smods.backend.repository.PlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PlanService {
    private final PlanRepository planRepository;

    @Autowired
    public PlanService(PlanRepository planRepository) {
        this.planRepository = planRepository;
    }

    public List<Plan> getAllPlans() {
        return planRepository.findAll();
    }

    public Optional<Plan> getPlanById(Integer id) {
        return planRepository.findById(id);
    }

    public Plan createPlan(Plan plan) {
        return planRepository.save(plan);
    }

    public Plan updatePlan(Integer id, Plan planDetails) {
        Plan plan = planRepository.findById(id).orElseThrow(() -> new RuntimeException("Plan not found with id: " + id));
        plan.setPname(planDetails.getPname());
        plan.setDegree(planDetails.getDegree());
        plan.setTrack(planDetails.getTrack());
        return planRepository.save(plan);
    }

    public void deletePlan(Integer id) {
        planRepository.deleteById(id);
    }
}
