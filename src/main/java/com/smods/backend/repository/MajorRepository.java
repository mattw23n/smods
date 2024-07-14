package com.smods.backend.repository;

import com.smods.backend.model.Track;
import com.smods.backend.model.Module;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface MajorRepository extends JpaRepository<Module, String> {

    @Query("SELECT t FROM Track t WHERE t.trackName = :trackName")
    Optional<Track> findTrackByTrackName(@Param("trackName") String trackName);
}
