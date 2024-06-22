package com.smods.backend.dao;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

@Repository
public class ModuleDAOimpl implements ModuleDAO{

    private EntityManager entityManager;

    public ModuleDAOimpl(EntityManager entityManager){
        this.entityManager = entityManager
    }
    @Override
    @Transactional
    public void save(Module module){
        entityManager.persist(module);
    }
}
