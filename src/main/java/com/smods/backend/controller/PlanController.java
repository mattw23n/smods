package com.smods.backend.controller;

import com.smods.backend.model.Plan;
import com.smods.backend.model.PlanModuleGPA;
import com.smods.backend.service.PlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/plans")
public class PlanController {

    private final PlanService planService;

    @Autowired
    public PlanController(PlanService planService) {
        this.planService = planService;
    }

    @GetMapping
    public ResponseEntity<List<Plan>> getAllPlans(@RequestParam Long userId) {
        List<Plan> plans = planService.getAllPlansByUser(userId);
        return ResponseEntity.ok(plans);
    }

    @PostMapping
    public ResponseEntity<Plan> createPlan(@RequestParam Long userId, @RequestBody Plan plan) {
        if (userId == null) {
            return ResponseEntity.badRequest().body(null);  // Handle the case where userId is not provided
        }
        Plan createdPlan = planService.createPlan(userId, plan);
        return ResponseEntity.ok(createdPlan);
    }

    @PutMapping("/{planId}/edit")
    public ResponseEntity<PlanModuleGPA> addModule(
            @PathVariable Long planId,
            @RequestParam Long userId,
            @RequestParam String moduleId,
            @RequestParam int term) {
        PlanModuleGPA updatedModule = planService.addModule(planId, userId, moduleId, term);
        return ResponseEntity.ok(updatedModule);
    }
}
