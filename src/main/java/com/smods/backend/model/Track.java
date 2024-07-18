package com.smods.backend.model;

import com.smods.backend.model.composite_key.TrackGradRequirementKey;
import jakarta.persistence.*;
import org.hibernate.annotations.Cascade;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@Entity
@Table(name = "TRACK")
public class Track extends Major{

    @Column(name = "TRACK_NAME")
    private String trackName;

    @ManyToOne
    @JoinColumn(name = "MAJOR_NAME", insertable = false, updatable = false)
    private Major major;

    @OneToMany(mappedBy = "track", cascade = CascadeType.ALL)
    private List<TrackGradRequirement> trackGradRequirements;

    public Track() {
    }

    public Track(String trackName, Major major) {
        this.trackName = trackName;
        this.major = major;
    }

    public String getTrackName() {
        return trackName;
    }

    public void setTrackName(String trackName) {
        this.trackName = trackName;
    }

    public Major getMajor() {
        return major;
    }

    public void setMajor(Major major) {
        this.major = major;
    }

    public List<TrackGradRequirement> getTrackGradRequirements() {
        return trackGradRequirements;
    }

    public void setTrackGradRequirements(List<TrackGradRequirement> trackGradRequirements) {
        this.trackGradRequirements = trackGradRequirements;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        Track track = (Track) o;
        return Objects.equals(trackName, track.trackName) && Objects.equals(major, track.major) && Objects.equals(trackGradRequirements, track.trackGradRequirements);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), trackName, major, trackGradRequirements);
    }

    @Override
    public String toString() {
        return "Track{" +
                "trackName='" + trackName + '\'' +
                ", major=" + major +
                ", trackGradRequirements=" + trackGradRequirements +
                '}';
    }
}
