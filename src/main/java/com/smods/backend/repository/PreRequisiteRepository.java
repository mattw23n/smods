package com.smods.backend.repository;

import com.smods.backend.model.PreRequisite;
import com.smods.backend.model.composite_key.PreRequisiteKey;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PreRequisiteRepository extends JpaRepository<PreRequisite, PreRequisiteKey> {
    List<PreRequisite> findByModuleId(String moduleId);
}