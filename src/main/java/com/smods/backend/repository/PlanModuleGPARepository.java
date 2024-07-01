package com.smods.backend.repository;

import com.smods.backend.model.PlanModuleGPA;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.smods.backend.model.composite_key.PlanModuleGPAKey;
@Repository
public interface PlanModuleGPARepository extends JpaRepository<PlanModuleGPA, PlanModuleGPAKey> {
}
