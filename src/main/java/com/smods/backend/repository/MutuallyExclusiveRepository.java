package com.smods.backend.repository;

import com.smods.backend.model.MutuallyExclusive;
import com.smods.backend.model.composite_key.MutuallyExclusiveKey;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MutuallyExclusiveRepository extends JpaRepository<MutuallyExclusive, MutuallyExclusiveKey> {
    List<MutuallyExclusive> findByModuleId(String moduleId);
}