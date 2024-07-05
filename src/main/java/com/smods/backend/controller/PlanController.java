package com.smods.backend.controller;

import com.smods.backend.model.Plan;
import com.smods.backend.model.PlanModuleGPA;
import com.smods.backend.model.composite_key.PlanKey;
import com.smods.backend.service.PlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users/{userId}/plans")
public class PlanController {

    private final PlanService planService;

    @Autowired
    public PlanController(PlanService planService) {
        this.planService = planService;
    }

    @GetMapping
    public ResponseEntity<?> getAllPlans(@PathVariable Long userId) {
        List<Plan> plans = planService.getAllPlansByUser(userId);
        if (plans.isEmpty()) {
            return ResponseEntity.ok("No plans found for this user.");
        }
        return ResponseEntity.ok(plans);
    }

    @PostMapping
    public ResponseEntity<Plan> createPlan(@PathVariable Long userId, @RequestBody Plan plan) {
        Plan createdPlan = planService.createPlan(userId, plan);
        return ResponseEntity.ok(createdPlan);
    }

    @DeleteMapping("/{planId}")
    public ResponseEntity<String> deletePlan(@PathVariable Long userId, @PathVariable Long planId) {
        planService.deletePlan(userId, planId);
        return ResponseEntity.ok("Plan successfully deleted.");
    }

    @PutMapping("/{planId}/edit")
    public ResponseEntity<PlanModuleGPA> addModule(
            @PathVariable Long userId,
            @PathVariable Long planId,
            @RequestParam String moduleId,
            @RequestParam int term) {
        PlanModuleGPA updatedModule = planService.addModule(planId, userId, moduleId, term);
        return ResponseEntity.ok(updatedModule);
    }

    @PutMapping("/{planId}/gpa")
    public ResponseEntity<String> setGPAEnabled(@PathVariable Long planId, @PathVariable Long userId, @RequestParam boolean enabled) {
        String message = planService.setGPAEnabled(planId, userId, enabled);
        return ResponseEntity.ok(message);
    }

    @PutMapping("/{planId}/modules/{moduleId}/gpa")
    public ResponseEntity<Void> updateGPA(@PathVariable Long planId, @PathVariable Long userId, @PathVariable String moduleId, @RequestParam Float gpa) {
        planService.updateGPA(planId, userId, moduleId, gpa);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{planId}/gpa")
    public ResponseEntity<Float> getAverageGPA(@PathVariable Long planId, @PathVariable Long userId) {
        Float averageGPA = planService.calculateAverageGPA(planId, userId);
        return ResponseEntity.ok(averageGPA);
    }
}