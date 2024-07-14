package com.smods.backend.repository;

import com.smods.backend.model.Track;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TrackRepository extends JpaRepository<Track, String> {

    Optional<Track> findByTrackName(String trackName);
}
