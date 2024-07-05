package com.smods.backend.service;

import com.smods.backend.dto.ModuleValidationResponse;
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

    public List<PlanModuleGPA> getPlanModulesByPlan(Long planId, Long userId) {
        return planModuleGPARepository.findByPlanIdAndUserId(planId, userId);
    }

    @Transactional
    public ModuleValidationResponse addModule(Long planId, Long userId, String moduleId, int term) {
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

        PlanModuleGPA planModuleGPA = new PlanModuleGPA(planModuleGPAKey, plan, module, term);
        planModuleGPARepository.save(planModuleGPA);

        return validatePlanModules(planId, userId);
    }

    @Transactional
    public ModuleValidationResponse deleteModule(Long planId, Long userId, String moduleId) {
        PlanKey planKey = new PlanKey(planId, userId);

        // check if plan exists
        Plan plan = planRepository.findById(planKey)
                .orElseThrow(() -> new RuntimeException("Plan doesn't exist"));

        // check if module exists
        Module module = moduleRepository.findById(moduleId)
                .orElseThrow(() -> new RuntimeException("Module doesn't exist"));

        // check if module is in the plan
        PlanModuleGPAKey planModuleGPAKey = new PlanModuleGPAKey(planKey, moduleId);
        PlanModuleGPA planModuleGPA = planModuleGPARepository.findById(planModuleGPAKey)
                .orElseThrow(() -> new RuntimeException("Module not found in plan"));

        planModuleGPARepository.delete(planModuleGPA);

        return validatePlanModules(planId, userId);
    }

    public ModuleValidationResponse validatePlanModules(Long planId, Long userId) {
        List<PlanModuleGPA> planModules = planModuleGPARepository.findByPlanIdAndUserId(planId, userId);
        List<String> unsatisfiedPreRequisites = new ArrayList<>();
        List<String> unsatisfiedCoRequisites = new ArrayList<>();
        List<String> mutuallyExclusiveConflicts = new ArrayList<>();

        for (PlanModuleGPA planModule : planModules) {
            String moduleId = planModule.getModule().getModuleId();
            int term = planModule.getTerm();

            List<Module> preRequisites = moduleRepository.findPreRequisitesById(moduleId);
            List<Module> takenModulesBeforeTerm = planModuleGPARepository.findAllPlanModulesByIdBeforeTerm(planId, userId, term);

            for (Module preReq : preRequisites) {
                if (!takenModulesBeforeTerm.contains(preReq)) {
                    unsatisfiedPreRequisites.add(moduleId + " requires " + preReq.getModuleId());
                }
            }

            List<Module> coRequisites = moduleRepository.findCoRequisitesById(moduleId);
            List<Module> takenModulesInTerm = planModuleGPARepository.findAllModulesByPlanIdAndTerm(planId, userId, term);

            for (Module coReq : coRequisites) {
                if (!takenModulesInTerm.contains(coReq)) {
                    unsatisfiedCoRequisites.add(moduleId + " requires " + coReq.getModuleId());
                }
            }

            List<Module> mutuallyExclusives = moduleRepository.findMutuallyExclusivesById(moduleId);
            List<Module> takenModules = planModuleGPARepository.findAllModulesByPlanId(planId, userId);

            for (Module conflict : mutuallyExclusives) {
                if (takenModules.contains(conflict)) {
                    mutuallyExclusiveConflicts.add(moduleId + " conflicts with " + conflict.getModuleId());
                }
            }
        }

        return new ModuleValidationResponse(unsatisfiedPreRequisites, unsatisfiedCoRequisites, mutuallyExclusiveConflicts);
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
    public void updateGPA(Long planId, Long userId, String moduleId, Float gpa) {
        PlanModuleGPAKey planModuleGPAKey = new PlanModuleGPAKey(new PlanKey(planId, userId), moduleId);
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