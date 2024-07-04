package com.smods.backend.service;

import com.smods.backend.exception.PlanNameConflictException;
import com.smods.backend.model.*;
import com.smods.backend.model.Module;
import com.smods.backend.model.composite_key.PlanKey;
import com.smods.backend.model.composite_key.PlanModuleGPAKey;
import com.smods.backend.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PlanService {

    private final PlanRepository planRepository;
    private final ModuleRepository moduleRepository;
    private final PlanModuleGPARepository planModuleGPARepository;
    private final UserRepository userRepository;

    @Autowired
    public PlanService(PlanRepository planRepository, ModuleRepository moduleRepository, PlanModuleGPARepository planModuleGPARepository, UserRepository userRepository) {
        this.planRepository = planRepository;
        this.moduleRepository = moduleRepository;
        this.planModuleGPARepository = planModuleGPARepository;
        this.userRepository = userRepository;
    }

    public List<Plan> getAllPlansByUser(Long userId) {
        return planRepository.findByUser(userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found")));
    }

    @Transactional
    public Plan createPlan(Long userId, Plan plan) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        // Check for duplicate plan name
        if (planRepository.existsByUserAndPlanName(user, plan.getPlanName())) {
            throw new PlanNameConflictException("A plan with the name '" + plan.getPlanName() + "' already exists.");
        }

        Long nextPlanId = planRepository.findMaxPlanIdByUserId(userId) + 1;
        plan.setPlanId(new PlanKey(nextPlanId, userId));
        plan.setUser(user);
        return planRepository.save(plan);
    }

    @Transactional
    public PlanModuleGPA addModule(PlanKey planId, String moduleId, int term) {
        // check if plan & module exists.
        if (!planRepository.existsById(planId)){
            throw new RuntimeException("plan doesn't exist");
        }

        if (!moduleRepository.existsById(moduleId)){
            throw new RuntimeException("module doesn't exist");
        }

        // check if module is already in plan
        PlanModuleGPA planModuleGPA = new PlanModuleGPA(new PlanModuleGPAKey(planId, moduleId), term);

        if (!planModuleGPARepository.existsById(planModuleGPA.getPlanModuleGPAId())){
            throw new RuntimeException("module is already in plan");
        }

        // validate module
        validatePreRequisites(planId, moduleId, term);
        validateCoRequisites(planId, moduleId, term);
        validateMutuallyExclusives(planId, moduleId);

        return planModuleGPARepository.save(planModuleGPA);
    }

    private void validatePreRequisites(PlanKey planId, String moduleId, int term){
        List<Module> preRequisites = moduleRepository.findPreRequisitesById(moduleId);

        List<Module> takenModules = planModuleGPARepository.findAllPlanModulesByIdBeforeTerm(
                new PlanModuleGPAKey(planId, moduleId), term);

        List<Module> unsatisfiedModules = new ArrayList<>();

        for (Module module : preRequisites){
            if (!takenModules.contains(module)){
                unsatisfiedModules.add(module);
            }
        }

        if (!unsatisfiedModules.isEmpty()){
            throw new RuntimeException("pre-requisites not met: " + unsatisfiedModules);
        }
    }

    private void validateCoRequisites(PlanKey planId, String moduleId, int term){
        List<Module> coRequisites = moduleRepository.findCoRequisitesById(moduleId);

        List<Module> takenModules = planModuleGPARepository.findAllModulesByPlanIdAndTerm(new PlanModuleGPAKey(planId, moduleId), term);

        List<Module> unsatisfiedModules = new ArrayList<>();

        for (Module module : coRequisites){
            if (!takenModules.contains(module)){
                unsatisfiedModules.add(module);
            }
        }

        if (!unsatisfiedModules.isEmpty()){
            throw new RuntimeException("co-requisites not met: " + unsatisfiedModules);
        }
    }

    public void validateMutuallyExclusives(PlanKey planId, String moduleId) {
        List<Module> mutuallyExclusives = moduleRepository.findMutuallyExclusivesById(moduleId);

        List<Module> takenModules = planModuleGPARepository.findAllModulesByPlanId(new PlanModuleGPAKey(planId, moduleId));

        List<Module> conflicts = new ArrayList<>();

        for (Module module : mutuallyExclusives) {
            if (!takenModules.contains(module)) {
                conflicts.add(module);
            }
        }

        if (!conflicts.isEmpty()) {
            throw new RuntimeException("you are not allowed to take" + moduleId + " because you have already taken " + conflicts);
        }
    }
}
