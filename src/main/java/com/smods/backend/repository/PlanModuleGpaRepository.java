package com.smods.backend.repository;

import com.smods.backend.model.PlanModuleGpa;
import com.smods.backend.model.composite_key.PlanModuleGpaKey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlanModuleGpaRepository extends JpaRepository<PlanModuleGpa, PlanModuleGpaKey> {
}
