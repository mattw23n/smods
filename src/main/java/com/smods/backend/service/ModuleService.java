package com.smods.backend.service;

import com.smods.backend.model.Module;
import com.smods.backend.model.PlanModuleGPA;
import com.smods.backend.model.composite_key.PlanKey;
import com.smods.backend.model.composite_key.PlanModuleGPAKey;
import com.smods.backend.repository.ModuleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class ModuleService {

    private final ModuleRepository moduleRepository;

    @Autowired
    public ModuleService(ModuleRepository moduleRepository) {
        this.moduleRepository = moduleRepository;
    }

    public List<PlanModuleGPA> searchModules(String searchTerm, Long planId, Long userId) {
        List<Module> modules = moduleRepository.findByModuleIdContainingIgnoreCase(searchTerm);

        PlanKey planKey = new PlanKey(planId, userId);
        return modules.stream().map(module -> {
            PlanModuleGPAKey planModuleGPAKey = new PlanModuleGPAKey(planKey, module.getModuleId());
            return new PlanModuleGPA(planModuleGPAKey, module, planKey,0);
        }).collect(Collectors.toList());
    }}
