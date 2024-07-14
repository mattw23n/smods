package com.smods.backend.model;

import jakarta.persistence.*;

<<<<<<< HEAD
import java.util.Map;
=======
>>>>>>> a87d4d024f7e053f41194b494a747aff6066f581
import java.util.Objects;

@Entity
@Table(name = "TRACK")
public class Track extends Major{

    @Column(name = "TRACK_NAME")
    private String trackName;

    @ManyToOne
    @JoinColumn(name = "MAJOR_NAME", insertable = false, updatable = false)
    private Major major;

<<<<<<< HEAD
    @ElementCollection
    @CollectionTable(name = "TRACK_GRAD_REQUIREMENT", joinColumns = @JoinColumn(name = "MAJOR_NAME"))
    @MapKeyColumn(name = "REQUIREMENT_TYPE")
    @Column(name = "COURSE_UNIT")
    private Map<String, Double> trackGradRequirements;

=======
>>>>>>> a87d4d024f7e053f41194b494a747aff6066f581
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

    @Override
<<<<<<< HEAD
    public Map<String, Double> getGradRequirements() {
        return trackGradRequirements;
    }

    @Override
    public void setGradRequirements(Map<String, Double> trackGradRequirements) {
        this.trackGradRequirements = trackGradRequirements;
    }

    @Override
=======
>>>>>>> a87d4d024f7e053f41194b494a747aff6066f581
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        Track track = (Track) o;
<<<<<<< HEAD
        return Objects.equals(trackName, track.trackName) && Objects.equals(major, track.major) && Objects.equals(trackGradRequirements, track.trackGradRequirements);
=======
        return Objects.equals(trackName, track.trackName) && Objects.equals(major, track.major);
>>>>>>> a87d4d024f7e053f41194b494a747aff6066f581
    }

    @Override
    public int hashCode() {
<<<<<<< HEAD
        return Objects.hash(super.hashCode(), trackName, major, trackGradRequirements);
=======
        return Objects.hash(super.hashCode(), trackName, major);
>>>>>>> a87d4d024f7e053f41194b494a747aff6066f581
    }

    @Override
    public String toString() {
        return "Track{" +
                "trackName='" + trackName + '\'' +
                ", major=" + major +
<<<<<<< HEAD
                ", trackGradRequirements=" + trackGradRequirements +
=======
>>>>>>> a87d4d024f7e053f41194b494a747aff6066f581
                '}';
    }
}
