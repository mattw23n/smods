package com.smods.backend.service;

import com.smods.backend.dto.ModuleValidationResponse;
import com.smods.backend.exception.PlanNameConflictException;
import com.smods.backend.model.*;
import com.smods.backend.model.Module;
import com.smods.backend.dto.PlanRequest;
import com.smods.backend.model.composite_key.PlanKey;
import com.smods.backend.model.composite_key.PlanModuleGPAKey;
import com.smods.backend.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.*;

@Service
public class PlanService {

    private final PlanRepository planRepository;
    private final ModuleRepository moduleRepository;
    private final PlanModuleGPARepository planModuleGPARepository;
    private final UserRepository userRepository;
    private final DegreeRepository degreeRepository;
    private final MajorRepository majorRepository;
    private final AuthorizationService authorizationService;

    @Autowired
    public PlanService(PlanRepository planRepository, ModuleRepository moduleRepository, PlanModuleGPARepository planModuleGPARepository, UserRepository userRepository, DegreeRepository degreeRepository, MajorRepository majorRepository, AuthorizationService authorizationService) {
        this.planRepository = planRepository;
        this.moduleRepository = moduleRepository;
        this.planModuleGPARepository = planModuleGPARepository;
        this.userRepository = userRepository;
        this.degreeRepository = degreeRepository;
        this.majorRepository = majorRepository;
        this.authorizationService = authorizationService;
    }

    public List<Plan> getAllPlansByUser(Long userId) {
        authorizationService.checkUserAuthorization(userId);
        return planRepository.findByUser(userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found")));
    }

    @Transactional
    public Plan createPlan(Long userId, PlanRequest planRequest) {
        authorizationService.checkUserAuthorization(userId);
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        // Check for duplicate plan name
        if (planRepository.existsByUserAndPlanName(user, planRequest.getPlanName())) {
            throw new PlanNameConflictException("A plan with the name '" + planRequest.getPlanName() + "' already exists.");
        }

        Degree degree = degreeRepository.findById(planRequest.getDegreeName()).orElseThrow(() -> new RuntimeException("Degree not found"));
        Major firstMajor = majorRepository.findById(planRequest.getFirstMajorName()).orElseThrow(() -> new RuntimeException("First major not found"));
        Major secondMajor = majorRepository.findById(planRequest.getSecondMajorName()).orElseThrow(() -> new RuntimeException("Second major not found"));

        Long nextPlanId = planRepository.findMaxPlanIdByUserId(userId) + 1;
        Plan plan = new Plan(new PlanKey(nextPlanId, userId), planRequest.getPlanName(), ZonedDateTime.now(), user, degree, firstMajor, secondMajor);
        return planRepository.save(plan);
    }

    @Transactional
    public void deletePlan(Long userId, Long planId) {
        authorizationService.checkUserAuthorization(userId);
        PlanKey planKey = new PlanKey(planId, userId);
        Plan plan = planRepository.findById(planKey).orElseThrow(() -> new RuntimeException("Plan not found"));
        planRepository.delete(plan);
    }

    @Transactional
    public Plan renamePlan(Long userId, Long planId, String newPlanName) {
        authorizationService.checkUserAuthorization(userId);
        PlanKey planKey = new PlanKey(planId, userId);
        Plan plan = planRepository.findById(planKey)
                .orElseThrow(() -> new RuntimeException("Plan not found"));

        // Check for duplicate plan name
        if (planRepository.existsByUserAndPlanName(plan.getUser(), newPlanName)) {
            throw new PlanNameConflictException("A plan with the name '" + newPlanName + "' already exists.");
        }

        plan.setPlanName(newPlanName);
        return planRepository.save(plan);
    }

    public List<PlanModuleGPA> getPlanModulesByPlan(Long planId, Long userId) {
        authorizationService.checkUserAuthorization(userId);
        return planModuleGPARepository.findByPlanIdAndUserId(planId, userId);
    }

    @Transactional
    public ModuleValidationResponse addModule(Long planId, Long userId, String moduleId, int term) {
        authorizationService.checkUserAuthorization(userId);
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

        PlanModuleGPA planModuleGPA = new PlanModuleGPA(planModuleGPAKey, term);
        planModuleGPA.setModule(module);
        planModuleGPARepository.save(planModuleGPA);

        return validatePlanModules(planId, userId);
    }

    @Transactional
    public ModuleValidationResponse deleteModule(Long planId, Long userId, String moduleId) {
        authorizationService.checkUserAuthorization(userId);
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
        authorizationService.checkUserAuthorization(userId);
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
                    unsatisfiedPreRequisites.add(moduleId + " requires " + preReq.getModuleId() + " as a pre-requisite.");
                }
            }

            List<Module> coRequisites = moduleRepository.findCoRequisitesById(moduleId);
            List<Module> takenModulesInTerm = planModuleGPARepository.findAllModulesByPlanIdAndTerm(planId, userId, term);

            for (Module coReq : coRequisites) {
                if (!takenModulesInTerm.contains(coReq)) {
                    unsatisfiedCoRequisites.add(moduleId + " requires " + coReq.getModuleId() + " to be taken in the same term.");
                }
            }

            List<Module> mutuallyExclusives = moduleRepository.findMutuallyExclusivesById(moduleId);
            List<Module> takenModules = planModuleGPARepository.findAllModulesByPlanId(planId, userId);

            for (Module conflict : mutuallyExclusives) {
                if (takenModules.contains(conflict)) {
                    mutuallyExclusiveConflicts.add("Only one of " + moduleId + " and " + conflict.getModuleId() + " can be taken.");
                }
            }
        }

        return new ModuleValidationResponse(unsatisfiedPreRequisites, unsatisfiedCoRequisites, mutuallyExclusiveConflicts);
    }

    public Map<String, Double> getPlanRequirementProgress(Long userId, Long planId){
        Plan plan = planRepository.findById(new PlanKey(userId, planId))
                .orElseThrow(() -> new RuntimeException("Plan not found"));

        Map<String, Double> targetRequirement = getPlanTargetRequirement(userId, planId);
        Map<String, Double> progressRequirement = new HashMap<>();

        List<PlanModuleGPA> planModules = plan.getPlanModuleGPAs();

        for (PlanModuleGPA planModule : planModules){
            updatePlanRequirementProgress(planModule.getPlan(), targetRequirement, progressRequirement, planModule.getModule());
        }

        return progressRequirement;
    }
    private Map<String, Double> getPlanTargetRequirement(Long userId, Long planId) {
        Plan plan = planRepository.findById(new PlanKey(userId, planId))
                .orElseThrow(() -> new RuntimeException("Plan not found"));

        return plan.getDegree().getGradRequirement();
    }


    private void updatePlanRequirementProgress(Plan plan,
                                               Map<String, Double> targetRequirement,
                                               Map<String, Double> requirementProgress,
                                               Module module){
        Double courseUnit = module.getCourseUnit();

        if (isSMUCore(plan, module)){
            incrementPlanRequirement("Uni Core", targetRequirement, requirementProgress, courseUnit);
        }
        else if (isMajorCore(plan, module)){
            incrementPlanRequirement("Major Core", targetRequirement, requirementProgress, courseUnit);
        }
        else if (isMajorElective(plan, module)){
            incrementPlanRequirement("Major Elective", targetRequirement, requirementProgress, courseUnit);
        }
        else{
            incrementPlanRequirement("Free Elective", targetRequirement, requirementProgress, courseUnit);
        }
    }

    private void incrementPlanRequirement(String category,
                                          Map<String, Double> targetRequirement,
                                          Map<String, Double> requirementProgress,
                                          Double courseUnit){

        if (Double.compare(targetRequirement.get(category), requirementProgress.get(category)) <= 0) {
            incrementPlanRequirement(Module.getLowerHierarchy(category), targetRequirement, requirementProgress, courseUnit);
        }
//        else if (Double.compare(targetRequirement.get(category), requirementProgress.get(category) + courseUnit) <= 0) {
//
//        }
        else {
            requirementProgress.put(category, requirementProgress.get(category) + courseUnit);
        }
    }
    private boolean isMajorCore(Plan plan, Module module){
        return moduleRepository
                .findAllMajorCore(plan.getDegree().getDegreeName())
                .contains(module);
    }

    private boolean isSMUCore(Plan plan, Module module){
        return moduleRepository
                .findAllSMUCore(plan.getDegree().getDegreeName())
                .contains(module);
    }

    private boolean isMajorElective(Plan plan, Module module){
        return moduleRepository
                .findAllMajorElective(plan.getDegree().getDegreeName())
                .contains(module);
    }
}
