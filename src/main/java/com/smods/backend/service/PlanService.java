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

//    public Map<String, Map<String, Double>> getGradRequirements(Plan plan) {
//        Map<String, Map<String, Double>> gradRequirements = new HashMap<>();
//
//        // Get all majors and tracks
//        Major major = plan.getMajor();
//        List<Track> tracks = getTracksFromPlan(plan);
//
//        List<MajorGradRequirement> majorRequirements = major.getMajorGradRequirements();
//
//        // Loop through all modules in the plan
//        for (PlanModuleGPA planModuleGPA : plan.getPlanModuleGPAs()) {
//            Module module = planModuleGPA.getModule();
//            SimpleEntry<String, String> gradRequirement = findGradRequirementAndBasket(tracks, major, module);
//
//            if (gradRequirement != null) {
//                String requirement = gradRequirement.getKey();
//                String basket = gradRequirement.getValue();
//
//                gradRequirements.putIfAbsent(requirement, new HashMap<>());
//
//                // TODO: given module requirement and current state of plan requirements, evaluate major requirements to decide which requirement to put module in
//
//                gradRequirements.get(requirement).merge(basket, module.getCourseUnit(), Double::sum);
//            }
//        }
//        return gradRequirements;
//    }

//    public Map<String, Double> getGradRequirements(Plan plan) {
//        Map<String, Double> gradRequirements = new HashMap<>();
//
//        // Get all majors and tracks
//        Major major = plan.getMajor();
//        List<Track> tracks = getTracksFromPlan(plan);
//
//        List<MajorGradRequirement> majorRequirements = major.getMajorGradRequirements();
//        for (MajorGradRequirement singleMajorGradRequirme)
//
//        // Loop through all modules in the plan
//        for (PlanModuleGPA planModuleGPA : plan.getPlanModuleGPAs()) {
//            Module module = planModuleGPA.getModule();
//            String gradRequirement = findGradRequirement(tracks, major, module);
//
//            if (gradRequirement != null) {
//                // TODO: given module requirement and current state of plan requirements, evaluate major requirements to decide which requirement to put module in
//                if (gradRequirements.get(gradRequirement) >= )
//                gradRequirements.merge(gradRequirement, module.getCourseUnit(), Double::sum);
//            }
//        }
//        return gradRequirements;
//    }
//
//    public Map<String, Double> getPlanGradRequirement(Plan plan){
//        Map<String, Double> targetGradRequirement = new HashMap<>();
//
//        List<MajorGradRequirement> majorGradRequirements = plan.getMajor().getMajorGradRequirements();
//        List<TrackGradRequirement> trackGradRequirements = new HashMap<>()
//
//        for (MajorGradRequirement majorGradRequirement : majorGradRequirements){
//            String gradRequirement = majorGradRequirement.getMajorGradRequirementId().getMajorGradRequirementType();
//            Double counter = 0.0;
//
//            Map<String, Double> majorBaskets = majorGradRequirement.getMajorBaskets();
//            Collection<Double> courseUnits = majorBaskets.values();
//            for (Double courseUnit : courseUnits){
//                counter += courseUnit;
//            }
//
//            targetGradRequirement.putIfAbsent(gradRequirement, 0.0);
//            targetGradRequirement.merge(gradRequirement, counter, Double::sum);*
//
//        }
//
//        List<Track> tracks = getTracksFromPlan(plan);
//    }
//
//    private List<Track> getTracksFromPlan(Plan plan) {
//        List<Track> tracks = new ArrayList<>();
//        if (plan.getTrack1() != null) {
//            tracks.add(trackRepository.findByTrackName(plan.getTrack1())
//                    .orElseThrow(() -> new TrackNotFoundException("Track not found: " + plan.getTrack1())));
//        }
//        if (plan.getTrack2() != null) {
//            tracks.add(trackRepository.findByTrackName(plan.getTrack2())
//                    .orElseThrow(() -> new TrackNotFoundException("Track not found: " + plan.getTrack2())));
//        }
//        return tracks;
//    }
//
//    private SimpleEntry<String, String> findGradRequirementAndBasket(List<Track> tracks, Major major, Module module) {
//        for (Track track : tracks) {
//            MajorModule majorModule = majorModuleRepository.findByTrackNameAndModule(track.getTrackName(), module);
//            if (majorModule != null) {
//                return new SimpleEntry<String, String>(majorModule.getGradRequirement(), majorModule.getBasket());
//            }
//        }
//
//        MajorModule majorModule = majorModuleRepository.findByMajorAndModule(major, module);
//        if (majorModule != null) {
//            return new SimpleEntry<String, String>(majorModule.getGradRequirement(), majorModule.getBasket());
//        }
//
//        majorModule = majorModuleRepository.findByModule(module);
//        return majorModule != null ? new SimpleEntry<String, String>(majorModule.getGradRequirement(), majorModule.getBasket()) : null;
//    }
//
//    private String findGradRequirement(List<Track> tracks, Major major, Module module) {
//        for (Track track : tracks) {
//            MajorModule majorModule = majorModuleRepository.findByTrackNameAndModule(track.getTrackName(), module);
//            if (majorModule != null) {
//                return majorModule.getGradRequirement();
//            }
//        }
//
//        MajorModule majorModule = majorModuleRepository.findByMajorAndModule(major, module);
//        if (majorModule != null) {
//            return majorModule.getGradRequirement();
//        }
//
//        majorModule = majorModuleRepository.findByModule(module);
//        return majorModule != null ? majorModule.getGradRequirement() : null;
//    }

}
