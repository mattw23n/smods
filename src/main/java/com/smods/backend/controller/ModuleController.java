package com.smods.backend.controller;

import com.smods.backend.model.Module;
import com.smods.backend.model.PlanModuleGPA;
import com.smods.backend.service.ModuleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

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
    public ResponseEntity<List<PlanModuleGPA>> searchModules(@RequestParam String searchTerm, @RequestParam Long planId, @RequestParam Long userId) {
        List<PlanModuleGPA> planModuleGPAs = moduleService.searchModules(searchTerm, planId, userId);
        return ResponseEntity.ok(planModuleGPAs);
    }
}
