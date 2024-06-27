package com.smods.backend.repository;

import com.smods.backend.model.PlanModulePreassignedGpa;
import com.smods.backend.model.PlanModuleId;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlanModulePreassignedGpaRepository extends JpaRepository<PlanModulePreassignedGpa, PlanModuleId> {
}
