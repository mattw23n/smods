package com.smods.backend.repository;

import com.smods.backend.model.Major;
import com.smods.backend.model.composite_key.PlanKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MajorRepository extends JpaRepository<Major, String> {

    @Query("SELECT p.majors FROM Plan p WHERE p.planId.planId = :planId AND p.planId.userId = :userId")
    List<Major> findMajorsByPlanId(@Param("planId") Long planId, @Param("userId") Long userId);

//    @Query("SELECT ")
//    Track findTrackByTrackName(@Param("trackName") String trackName);
}
