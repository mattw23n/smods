package com.smods.backend.controller;

import java.util.*;

import com.smods.backend.model.Module;
import com.smods.backend.dto.ModuleValidationResponse;
import com.smods.backend.model.*;
import com.smods.backend.dto.PlanRequest;
import com.smods.backend.service.PlanService;
import com.smods.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/users/{userId}/plans")
public class PlanController {

    private final PlanService planService;
    private final UserService userService;

    @Autowired
    public PlanController(PlanService planService, UserService userService) {
        this.planService = planService;
        this.userService = userService;
    }

    private void checkUserAuthorization(Long userId) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String currentUsername = authentication.getName();
        User currentUser = userService.findByUsername(currentUsername)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));

        if (!currentUser.getUserId().equals(userId)) {
            throw new AccessDeniedException("Forbidden");
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllPlans(@PathVariable Long userId) {
        checkUserAuthorization(userId);
        List<Plan> plans = planService.getAllPlansByUser(userId);
        if (plans.isEmpty()) {
            return ResponseEntity.ok("No plans found for this user.");
        }
        return ResponseEntity.ok(plans);
    }

    @PostMapping
    public ResponseEntity<Plan> createPlan(
            @PathVariable Long userId,
            @RequestParam String planName,
            @RequestParam String degreeName,
            @RequestParam String firstMajorName,
            @RequestParam(required = false) String secondMajorName) {
        PlanRequest planRequest = new PlanRequest(planName, degreeName, firstMajorName, secondMajorName);
        Plan createdPlan = planService.createPlan(userId, planRequest);
        return ResponseEntity.ok(createdPlan);
    }
    @DeleteMapping("/{planId}")
    public ResponseEntity<String> deletePlan(@PathVariable Long userId, @PathVariable Long planId) {
        checkUserAuthorization(userId);
        planService.deletePlan(userId, planId);
        return ResponseEntity.ok("Plan successfully deleted.");
    }

    @PutMapping("/{planId}/rename")
    public ResponseEntity<Plan> renamePlan(
            @PathVariable Long userId,
            @PathVariable Long planId,
            @RequestParam String newPlanName) {
        checkUserAuthorization(userId);
        Plan renamedPlan = planService.renamePlan(userId, planId, newPlanName);
        return ResponseEntity.ok(renamedPlan);
    }

    @GetMapping("/{planId}/modules")
    public ResponseEntity<List<PlanModuleGPA>> getPlanModulesByPlan(@PathVariable Long planId, @PathVariable Long userId) {
        checkUserAuthorization(userId);
        List<PlanModuleGPA> planModules = planService.getPlanModulesByPlan(planId, userId);
        return ResponseEntity.ok(planModules);
    }

    @PutMapping("/{planId}/update")
    public ResponseEntity<ModuleValidationResponse> updateModule(
            @PathVariable Long planId,
            @PathVariable Long userId,
            @RequestParam String moduleId,
            @RequestParam int term,
            @RequestParam(required = false) Boolean isAdding,
            @RequestParam(required = false) Double gpa) {
        ModuleValidationResponse response = planService.updateModule(planId, userId, moduleId, term, isAdding, gpa);
        return ResponseEntity.ok(response);
    }


    @GetMapping("/{planId}/gradRequirement")
    public ResponseEntity<Map<String, Double>> getPlanRequirementProgress(@PathVariable Long userId, @PathVariable Long planId) {
        checkUserAuthorization(userId);
        Map<String, Double> requirementProgress = planService.getPlanRequirementProgress(userId, planId);
        return ResponseEntity.ok(requirementProgress);
    }

    @GetMapping("/{planId}")
    public ResponseEntity<Plan> getPlanById(@PathVariable Long userId, @PathVariable Long planId) {
        Optional<Plan> plan = planService.getPlanById(userId, planId);
        return plan.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());

    }
}
