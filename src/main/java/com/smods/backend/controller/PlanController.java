package com.smods.backend.controller;

import java.util.List;
import java.util.Set;

import com.smods.backend.model.Module;
import com.smods.backend.model.Plan;
import com.smods.backend.model.User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;

public class PlanController {
    @GetMapping("/newplan")
    public Plan newPlan(@RequestParam User user, @RequestParam String name, @RequestParam String degree, @RequestParam String track, @RequestBody Set<Module> exemptions){

        // create plan
        Plan newPlan = new Plan(name, degree, track, exemptions);

        // store plan in database


        // return plan
        return newPlan;
    }

    public void createPlan(User user, Plan plan){
        // Update the database with a new plan
    }
}
