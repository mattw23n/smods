package com.smods.backend.service;

import com.smods.backend.model.Module;
import com.smods.backend.repository.ModuleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ModuleService {

    private final ModuleRepository moduleRepository;

    @Autowired
    public ModuleService(ModuleRepository moduleRepository) {
        this.moduleRepository = moduleRepository;
    }

    public List<Module> searchModules(String searchTerm) {
        return moduleRepository.searchModules(searchTerm);
    }
}