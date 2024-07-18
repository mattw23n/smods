package com.smods.backend.controller;

import com.smods.backend.model.Plan;
import com.smods.backend.model.User;
import com.smods.backend.service.PlanService;
import com.smods.backend.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.*;

public class PlanControllerTest {

    @Mock
    private PlanService planService;

    @Mock
    private UserService userService;

    @InjectMocks
    private PlanController planController;

    @Mock
    private SecurityContext securityContext;

    @Mock
    private Authentication authentication;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
        SecurityContextHolder.setContext(securityContext);
    }

    @Test
    public void testGetAllPlans_Success() {
        Long userId = 1L;
        Plan plan = new Plan();
        plan.setPlanName("Test Plan");
        List<Plan> plans = Collections.singletonList(plan);

        User user = new User();
        user.setUserId(userId);
        user.setUsername("testuser");

        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getName()).thenReturn("testuser");
        when(userService.findByUsername("testuser")).thenReturn(Optional.of(user));
        when(planService.getAllPlansByUser(userId)).thenReturn(plans);

        ResponseEntity<?> response = planController.getAllPlans(userId);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(plans, response.getBody());
    }

    @Test
    public void testGetAllPlans_NoPlansFound() {
        Long userId = 1L;

        User user = new User();
        user.setUserId(userId);
        user.setUsername("testuser");

        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getName()).thenReturn("testuser");
        when(userService.findByUsername("testuser")).thenReturn(Optional.of(user));
        when(planService.getAllPlansByUser(userId)).thenReturn(Collections.emptyList());

        ResponseEntity<?> response = planController.getAllPlans(userId);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals("No plans found for this user.", response.getBody());
    }

    @Test
    public void testGetAllPlans_Unauthorized() {
        Long userId = 1L;

        User user = new User();
        user.setUserId(2L); // Different user ID
        user.setUsername("testuser");

        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getName()).thenReturn("testuser");
        when(userService.findByUsername("testuser")).thenReturn(Optional.of(user));

        assertThrows(AccessDeniedException.class, () -> {
            planController.getAllPlans(userId);
        });
    }

    @Test
    public void testCreatePlan_Success() {
        Long userId = 1L;
        Plan plan = new Plan();
        plan.setPlanName("Test Plan");

        User user = new User();
        user.setUserId(userId);
        user.setUsername("testuser");

        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getName()).thenReturn("testuser");
        when(userService.findByUsername("testuser")).thenReturn(Optional.of(user));
        when(planService.createPlan(userId, plan)).thenReturn(plan);

        ResponseEntity<Plan> response = planController.createPlan(userId, plan);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(plan, response.getBody());
    }

    @Test
    public void testDeletePlan_Success() {
        Long userId = 1L;
        Long planId = 1L;

        User user = new User();
        user.setUserId(userId);
        user.setUsername("testuser");

        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getName()).thenReturn("testuser");
        when(userService.findByUsername("testuser")).thenReturn(Optional.of(user));
        doNothing().when(planService).deletePlan(userId, planId);

        ResponseEntity<String> response = planController.deletePlan(userId, planId);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Plan successfully deleted.", response.getBody());
    }

    @Test
    public void testRenamePlan_Success() {
        Long userId = 1L;
        Long planId = 1L;
        String newPlanName = "Renamed Plan";

        Plan renamedPlan = new Plan();
        renamedPlan.setPlanName(newPlanName);

        User user = new User();
        user.setUserId(userId);
        user.setUsername("testuser");

        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getName()).thenReturn("testuser");
        when(userService.findByUsername("testuser")).thenReturn(Optional.of(user));
        when(planService.renamePlan(userId, planId, newPlanName)).thenReturn(renamedPlan);

        ResponseEntity<Plan> response = planController.renamePlan(userId, planId, newPlanName);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(renamedPlan, response.getBody());
    }
}
