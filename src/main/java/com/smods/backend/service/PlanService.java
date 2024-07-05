package com.smods.backend.service;

import com.smods.backend.exception.CoRequisiteNotSatisfiedException;
import com.smods.backend.exception.MutuallyExclusiveConflictException;
import com.smods.backend.exception.PlanNameConflictException;
import com.smods.backend.exception.PreRequisiteNotSatisfiedException;
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

    public void deletePlan(Long userId, Long planId) {
        PlanKey planKey = new PlanKey(planId, userId);
        Plan plan = planRepository.findById(planKey).orElseThrow(() -> new RuntimeException("Plan not found"));
        planRepository.delete(plan);
    }

    @Transactional
    public PlanModuleGPA addModule(Long planId, Long userId, String moduleId, int term) {
        PlanKey planKey = new PlanKey(planId, userId);

        // check if plan exists
        Plan plan = planRepository.findById(planKey)
                .orElseThrow(() -> new RuntimeException("Plan doesn't exist"));

        // check if module exists
        Module module = moduleRepository.findById(moduleId)
                .orElseThrow(() -> new RuntimeException("Module doesn't exist"));

        // check if module is already in plan
        PlanModuleGPAKey planModuleGPAKey = new PlanModuleGPAKey(planKey, moduleId);
        if (planModuleGPARepository.existsById(planModuleGPAKey)) {
            throw new RuntimeException("Module is already in plan");
        }

        // validate module
        validatePreRequisites(planId, userId, moduleId, term);
        validateCoRequisites(planId, userId, moduleId, term);
        validateMutuallyExclusives(planId, userId, moduleId);

        PlanModuleGPA planModuleGPA = new PlanModuleGPA(planModuleGPAKey, plan, module, term);
        return planModuleGPARepository.save(planModuleGPA);
    }

    private void validatePreRequisites(Long planId, Long userId, String moduleId, int term){
        List<Module> preRequisites = moduleRepository.findPreRequisitesById(moduleId);

        List<Module> takenModules = planModuleGPARepository.findAllPlanModulesByIdBeforeTerm(planId, userId, term);

        List<Module> unsatisfiedModules = new ArrayList<>();

        for (Module module : preRequisites){
            if (!takenModules.contains(module)){
                unsatisfiedModules.add(module);
            }
        }

        if (!unsatisfiedModules.isEmpty()){
            throw new PreRequisiteNotSatisfiedException("Pre-requisites not met: " + unsatisfiedModules);
        }
    }

    private void validateCoRequisites(Long planId, Long userId, String moduleId, int term){
        List<Module> coRequisites = moduleRepository.findCoRequisitesById(moduleId);

        List<Module> takenModules = planModuleGPARepository.findAllModulesByPlanIdAndTerm(planId, userId, term);

        List<Module> unsatisfiedModules = new ArrayList<>();

        for (Module module : coRequisites){
            if (!takenModules.contains(module)){
                unsatisfiedModules.add(module);
            }
        }

        if (!unsatisfiedModules.isEmpty()){
            throw new CoRequisiteNotSatisfiedException("Co-requisites not met: " + unsatisfiedModules);
        }
    }

    public void validateMutuallyExclusives(Long planId, Long userId, String moduleId) {
        List<Module> mutuallyExclusives = moduleRepository.findMutuallyExclusivesById(moduleId);

        List<Module> takenModules = planModuleGPARepository.findAllModulesByPlanId(planId, userId);

        List<Module> conflicts = new ArrayList<>();

        for (Module module : mutuallyExclusives) {
            if (!takenModules.contains(module)) {
                conflicts.add(module);
            }
        }

        if (!conflicts.isEmpty()) {
            throw new MutuallyExclusiveConflictException("You are not allowed to take" + moduleId + " because you have already taken " + conflicts);
        }
    }

    @Transactional
    public String setGPAEnabled(Long planId, Long userId, boolean gpaEnabled) {
        PlanKey planKey = new PlanKey(planId, userId);
        Plan plan = planRepository.findById(planKey)
                .orElseThrow(() -> new RuntimeException("Plan not found"));
        plan.setGPAEnabled(gpaEnabled);
        planRepository.save(plan);
        return "GPA has been " + (gpaEnabled ? "enabled." : "disabled.");
    }

    @Transactional
    public void updateGPA(PlanKey planId, String moduleId, Float gpa) {
        PlanModuleGPAKey planModuleGPAKey = new PlanModuleGPAKey(planId, moduleId);
        PlanModuleGPA planModuleGPA = planModuleGPARepository.findById(planModuleGPAKey)
                .orElseThrow(() -> new RuntimeException("Module not found in plan"));
        planModuleGPA.setGPA(gpa);
        planModuleGPARepository.save(planModuleGPA);
    }

    public Float calculateAverageGPA(Long planId, Long userId) {
        List<PlanModuleGPA> modules = planModuleGPARepository.findByPlanIdAndUserId(planId, userId);
        if (modules.isEmpty()) {
            return null;
        }

        Float totalGPA = 0f;
        int count = 0;
        for (PlanModuleGPA module : modules) {
            if (module.getGPA() != null) {
                totalGPA += module.getGPA();
                count++;
            }
        }

        return count > 0 ? totalGPA / count : null;
    }
}