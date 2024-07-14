package com.smods.backend.service;

import com.smods.backend.dto.ModuleValidationResponse;
import com.smods.backend.exception.PlanNameConflictException;
<<<<<<< HEAD
import com.smods.backend.model.*;
import com.smods.backend.model.Module;
=======
import com.smods.backend.model.Module;
import com.smods.backend.model.Plan;
import com.smods.backend.model.PlanModuleGPA;
import com.smods.backend.model.User;
>>>>>>> a87d4d024f7e053f41194b494a747aff6066f581
import com.smods.backend.model.composite_key.PlanKey;
import com.smods.backend.model.composite_key.PlanModuleGPAKey;
import com.smods.backend.repository.*;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class PlanService {

    private final PlanRepository planRepository;
    private final ModuleRepository moduleRepository;
    private final PlanModuleGPARepository planModuleGPARepository;
    private final UserRepository userRepository;
<<<<<<< HEAD
    private final MajorRepository majorRepository;
    private final AuthorizationService authorizationService;

    @Autowired
    public PlanService(PlanRepository planRepository, ModuleRepository moduleRepository, PlanModuleGPARepository planModuleGPARepository, UserRepository userRepository, AuthorizationService authorizationService, MajorRepository majorRepository) {
=======
    private final AuthorizationService authorizationService;

    @Autowired
    public PlanService(PlanRepository planRepository, ModuleRepository moduleRepository, PlanModuleGPARepository planModuleGPARepository, UserRepository userRepository, AuthorizationService authorizationService) {
>>>>>>> a87d4d024f7e053f41194b494a747aff6066f581
        this.planRepository = planRepository;
        this.moduleRepository = moduleRepository;
        this.planModuleGPARepository = planModuleGPARepository;
        this.userRepository = userRepository;
<<<<<<< HEAD
        this.majorRepository = majorRepository;
=======
>>>>>>> a87d4d024f7e053f41194b494a747aff6066f581
        this.authorizationService = authorizationService;
    }

    public List<Plan> getAllPlansByUser(Long userId) {
        authorizationService.checkUserAuthorization(userId);
        return planRepository.findByUser(userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found")));
    }

    @Transactional
    public Plan createPlan(Long userId, Plan plan) {
        authorizationService.checkUserAuthorization(userId);
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));

        // Check for duplicate plan name
        if (planRepository.existsByUserAndPlanName(user, plan.getPlanName())) {
            throw new PlanNameConflictException("A plan with the name '" + plan.getPlanName() + "' already exists.");
        }

        Long nextPlanId = planRepository.findMaxPlanIdByUserId(userId) + 1;
        plan.setPlanId(new PlanKey(nextPlanId, userId));
        plan.setUser(user);
        plan.setCreationDateTime(ZonedDateTime.now());
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

<<<<<<< HEAD
        PlanModuleGPA planModuleGPA = new PlanModuleGPA(planModuleGPAKey, term);
=======
        PlanModuleGPA planModuleGPA = new PlanModuleGPA(planModuleGPAKey, plan, module, term);
>>>>>>> a87d4d024f7e053f41194b494a747aff6066f581
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

<<<<<<< HEAD
//    public Map<String, Double> getGradRequirements(Plan plan){
//        // check the Plan's major and track.
//        List<Major> majors = plan.getMajors();
//        List<Track> track =
//
//        // If the plan has a track
//        if (plan.getTrack1() != null || plan.getTrack2() != null){
//            // iterate each module
//            for (PlanModuleGPA planModuleGPA : plan.getPlanModuleGPAs()){
//
//            }
//        }
//
//                // if the track name of plan and modules matches
//                    // add to map track core or elective based on grad requirement of module
//                // else if the major name matches
//                    // add to map major core or major elective based on grad requirement of module
//                // else
//                    // add to map either SMU core or free elective based on grad requirement of module.
//
//        return null;
=======
//    public static Map<String, Double> getGradRequirements(Plan plan){
//        // for each module in plan,
>>>>>>> a87d4d024f7e053f41194b494a747aff6066f581
//    }
}
