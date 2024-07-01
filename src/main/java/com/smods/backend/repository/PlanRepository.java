package com.smods.backend.repository;

import com.smods.backend.model.Plan;
import com.smods.backend.model.composite_key.PlanKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlanRepository extends JpaRepository<Plan, PlanKey> {

}
