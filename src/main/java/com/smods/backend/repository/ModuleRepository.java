package com.smods.backend.repository;

import com.smods.backend.model.Module;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ModuleRepository extends JpaRepository<Module, String> {
    @Query("SELECT m.preRequisites FROM Module m WHERE m.moduleId = :moduleId")
    List<Module> findPreRequisitesById(@Param("moduleId") String moduleId);

    @Query("SELECT m.coRequisites FROM Module m WHERE m.moduleId = :moduleId")
    List<Module> findCoRequisitesById(@Param("moduleId")String moduleId);

    @Query("SELECT m.mutuallyExclusives FROM Module m WHERE m.moduleId = :moduleId")
    List<Module> findMutuallyExclusivesById(@Param("moduleId") String moduleId);

    @Query("SELECT m FROM Module m WHERE LOWER(m.moduleId) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR LOWER(m.moduleName) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    List<Module> searchModules(@Param("searchTerm") String searchTerm);
}