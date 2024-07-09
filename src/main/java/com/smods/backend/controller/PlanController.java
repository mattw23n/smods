package com.smods.backend.controller;

import com.smods.backend.dto.ModuleValidationResponse;
import com.smods.backend.model.Module;
import com.smods.backend.model.Plan;
import com.smods.backend.model.PlanModuleGPA;
import com.smods.backend.model.composite_key.PlanKey;
import com.smods.backend.service.PlanService;
import org.hibernate.internal.util.ZonedDateTimeComparator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.ZonedDateTime;
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
        createdPlan.setCreationDateTime(ZonedDateTime.now());
        return ResponseEntity.ok(createdPlan);
    }

    @DeleteMapping("/{planId}")
    public ResponseEntity<String> deletePlan(@PathVariable Long userId, @PathVariable Long planId) {
        planService.deletePlan(userId, planId);
        return ResponseEntity.ok("Plan successfully deleted.");
    }

    @GetMapping("/{planId}/modules")
    public ResponseEntity<List<PlanModuleGPA>> getPlanModulesByPlan(@PathVariable Long planId, @PathVariable Long userId) {
        List<PlanModuleGPA> planModules = planService.getPlanModulesByPlan(planId, userId);
        return ResponseEntity.ok(planModules);
    }

    @PutMapping("/{planId}/edit")
    public ResponseEntity<ModuleValidationResponse> addModule(
            @PathVariable Long planId,
            @PathVariable Long userId,
            @RequestParam String moduleId,
            @RequestParam int term) {
        ModuleValidationResponse response = planService.addModule(planId, userId, moduleId, term);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{planId}/edit")
    public ResponseEntity<ModuleValidationResponse> deleteModule(
            @PathVariable Long planId,
            @PathVariable Long userId,
            @RequestParam String moduleId) {
        ModuleValidationResponse response = planService.deleteModule(planId, userId, moduleId);
        return ResponseEntity.ok(response);
    }

    @PutMapping("/{planId}/modules/{moduleId}/gpa")
    public ResponseEntity<Void> updateGPA(@PathVariable Long planId, @PathVariable Long userId, @PathVariable String moduleId, @RequestParam Float gpa) {
        planService.updateGPA(planId, userId, moduleId, gpa);
        return ResponseEntity.ok().build();
    }
}