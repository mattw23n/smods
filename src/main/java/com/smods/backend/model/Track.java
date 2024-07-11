package com.smods.backend.model;

import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(name = "TRACK")
public class Track extends Major{

    @Column(name = "TRACK_NAME")
    private String trackName;

    @ManyToOne
    @JoinColumn(name = "MAJOR_NAME", insertable = false, updatable = false)
    private Major major;

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
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        if (!super.equals(o)) return false;
        Track track = (Track) o;
        return Objects.equals(trackName, track.trackName) && Objects.equals(major, track.major);
    }

    @Override
    public int hashCode() {
        return Objects.hash(super.hashCode(), trackName, major);
    }

    @Override
    public String toString() {
        return "Track{" +
                "trackName='" + trackName + '\'' +
                ", major=" + major +
                '}';
    }
}
