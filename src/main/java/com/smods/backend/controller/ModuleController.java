package com.smods.backend.controller;

import com.smods.backend.model.Module;
import com.smods.backend.model.PlanModuleGPA;
import com.smods.backend.service.ModuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/modules")
public class ModuleController {

    private final ModuleService moduleService;

    @Autowired
    public ModuleController(ModuleService moduleService) {
        this.moduleService = moduleService;
    }

    @GetMapping("/search")
    public ResponseEntity<List<PlanModuleGPA>> searchModules(
            @RequestParam String searchTerm,
            @RequestParam String filter,
            @RequestParam Long planId,
            @RequestParam Long userId) {
        List<PlanModuleGPA> planModuleGPAs = moduleService.searchModules(searchTerm, filter, planId, userId);
        return ResponseEntity.ok(planModuleGPAs);
    }

    @GetMapping("/{moduleId}")
    public ResponseEntity<Module> getModuleDetails(@PathVariable String moduleId) {
        Module module = moduleService.getModuleDetails(moduleId);
        return ResponseEntity.ok(module);
    }
}
