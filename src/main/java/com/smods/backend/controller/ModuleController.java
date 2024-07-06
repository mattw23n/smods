package com.smods.backend.controller;

import com.smods.backend.model.Module;
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
    public ResponseEntity<List<Module>> searchModules(@RequestParam String searchTerm) {
        List<Module> modules = moduleService.searchModules(searchTerm);
        return ResponseEntity.ok(modules);
    }
}
