package com.smods.backend.service;

import com.smods.backend.model.Module;
import com.smods.backend.model.PlanModuleGPA;
import com.smods.backend.model.composite_key.PlanKey;
import com.smods.backend.model.composite_key.PlanModuleGPAKey;
import com.smods.backend.repository.ModuleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ModuleService {

    private final ModuleRepository moduleRepository;

    @Autowired
    public ModuleService(ModuleRepository moduleRepository) {
        this.moduleRepository = moduleRepository;
    }

    public List<PlanModuleGPA> searchModules(String searchTerm, String filter, Long planId, Long userId) {
        List<Module> modules = switch (filter.toLowerCase()) {
            case "course code" -> moduleRepository.findByModuleIdContainingIgnoreCase(searchTerm);
            case "course title" -> moduleRepository.findByModuleNameContainingIgnoreCase(searchTerm);
            case "major core" -> moduleRepository.findAllMajorCore(searchTerm);
            case "smu core" -> moduleRepository.findAllSMUCore(searchTerm);
            default -> new ArrayList<>();
        };

        PlanKey planKey = new PlanKey(planId, userId);
        return modules.stream().map(module -> {
            PlanModuleGPAKey planModuleGPAKey = new PlanModuleGPAKey(planKey, module.getModuleId());
            PlanModuleGPA planModuleGPA = new PlanModuleGPA(planModuleGPAKey, 0);
            planModuleGPA.setModule(module); // Ensure module details are included
            planModuleGPA.setError(false); // Default to no errors
            return planModuleGPA;
        }).collect(Collectors.toList());
    }

    public Module getModuleDetails(String moduleId) {
        return moduleRepository.findById(moduleId)
                .orElseThrow(() -> new RuntimeException("Module not found"));
    }
}

