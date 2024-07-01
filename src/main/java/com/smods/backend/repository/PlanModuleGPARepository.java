package com.smods.backend.repository;

import com.smods.backend.model.PlanModuleGPA;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.smods.backend.model.composite_key.PlanModuleGPAKey;
@Repository
public interface PlanModuleGPARepository extends JpaRepository<PlanModuleGPA, PlanModuleGPAKey> {
//    1. Basic CRUD Operations

//    Create: Save a new entity or a batch of entities.
//    S save(S entity): Saves a given entity.
//    List<S> saveAll(Iterable<S> entities): Saves all given entities.

//    Read: Retrieve entities by ID, find all entities, or check for existence.
//    Optional<T> findById(ID id): Retrieves an entity by its ID.
//    boolean existsById(ID id): Checks whether an entity with the given ID exists.
//    List<T> findAll(): Returns all entities.
//    List<T> findAllById(Iterable<ID> ids): Returns all entities with the given IDs.
//    long count(): Returns the count of all entities.

//    Update: Save an existing entity (usually involves read-modify-write cycle).
//    S save(S entity): Saves a given entity (can be used to update if the entity already exists).

//    Delete: Delete entities by ID, by entity, or in bulk.
//    void deleteById(ID id): Deletes the entity with the given ID.
//    void delete(T entity): Deletes a given entity.
//    void deleteAll(Iterable<? extends T> entities): Deletes all given entities.
//    void deleteAll(): Deletes all entities.
//    void deleteAllInBatch(): Deletes all entities in a batch.

//    2. Pagination and Sorting

//    Pagination: Retrieve entities in a paginated manner.
//    Page<T> findAll(Pageable pageable): Returns a page of entities matching the pageable options.

//    Sorting: Retrieve all entities sorted by given options.
//    List<T> findAll(Sort sort): Returns all entities sorted by the given options.

//    Combined: Pagination and sorting together.
//    Page<T> findAll(Pageable pageable, Sort sort): Returns a page of entities sorted and paginated by the given options

//    3. Custom Query Methods

//    Query Derivation: Define query methods based on method names.
//    List<T> findByProperty(PropertyType property): Finds entities based on a property (e.g., findByLastName(String lastName)).
//    Optional<T> findByPropertyAndOtherProperty(PropertyType property, OtherPropertyType otherProperty): Finds entities based on multiple properties.
//
//    Custom Queries with @Query Annotation: Define custom JPQL or native SQL queries.
//    @Query("SELECT t FROM Entity t WHERE t.property = :property")
//    Optional<T> findByCustomQuery(@Param("property") PropertyType property);
//    For native SQL: @Query(value = "SELECT * FROM table WHERE property = :property", nativeQuery = true)
}
