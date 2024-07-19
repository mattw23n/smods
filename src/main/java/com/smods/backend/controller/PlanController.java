package com.smods.backend.controller;

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

import java.util.List;

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
            @RequestBody PlanRequest planRequest) {
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

    @PutMapping("/{planId}/add")
    public ResponseEntity<ModuleValidationResponse> addModule(
            @PathVariable Long planId,
            @PathVariable Long userId,
            @RequestParam String moduleId,
            @RequestParam int term) {
        checkUserAuthorization(userId);
        ModuleValidationResponse response = planService.addModule(planId, userId, moduleId, term);
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{planId}/delete")
    public ResponseEntity<ModuleValidationResponse> deleteModule(
            @PathVariable Long planId,
            @PathVariable Long userId,
            @RequestParam String moduleId) {
        checkUserAuthorization(userId);
        ModuleValidationResponse response = planService.deleteModule(planId, userId, moduleId);
        return ResponseEntity.ok(response);
    }
}
