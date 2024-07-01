package com.smods.backend.repository;

import com.smods.backend.model.CoRequisite;
import com.smods.backend.model.composite_key.CoRequisiteKey;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CoRequisiteRepository extends JpaRepository<CoRequisite, CoRequisiteKey> {
    List<CoRequisite> findByModuleId(String moduleId);
}