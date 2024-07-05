package com.smods.backend.repository;

import com.smods.backend.model.Module;
import com.smods.backend.model.PlanModuleGPA;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.smods.backend.model.composite_key.PlanModuleGPAKey;

import java.util.List;

@Repository
public interface PlanModuleGPARepository extends JpaRepository<PlanModuleGPA, PlanModuleGPAKey> {

    boolean existsById(PlanModuleGPAKey id);

    @Query("SELECT p.module FROM PlanModuleGPA p " +
            "WHERE p.planModuleGPAId.planId = :#{#planModuleGPAId.planId} " +
            "AND p.term < :term")
    public List<Module> findAllPlanModulesByIdBeforeTerm(@Param("planModuleGPAId") PlanModuleGPAKey planModuleGPAId, @Param("term") int term);

    @Query("SELECT p.module FROM PlanModuleGPA p " +
            "WHERE p.planModuleGPAId.planId = :#{#planModuleGPAId.planId} " +
            "AND p.term = :term")
    public List<Module> findAllModulesByPlanIdAndTerm(@Param("planModuleGPAId") PlanModuleGPAKey planModuleGPAId, @Param("term") int term);

    @Query("SELECT p.module FROM PlanModuleGPA p " +
            "WHERE p.planModuleGPAId.planId = :#{#planModuleGPAId.planId} ")
    public List<Module> findAllModulesByPlanId(@Param("planModuleGPAId") PlanModuleGPAKey planModuleGPAId);
}
