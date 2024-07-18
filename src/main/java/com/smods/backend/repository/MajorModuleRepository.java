package com.smods.backend.repository;

import com.smods.backend.model.Major;
import com.smods.backend.model.Module;
import com.smods.backend.model.MajorModule;
import com.smods.backend.model.composite_key.MajorModuleKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MajorModuleRepository extends JpaRepository<MajorModule, MajorModuleKey> {

    boolean existsByTrackNameAndModule(String trackName, Module module);

    MajorModule findByTrackNameAndModule(String trackName, Module module);
    MajorModule findByMajorAndModule(Major major, Module module);
    MajorModule findByModule(Module module);
}
