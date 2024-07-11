package com.smods.backend.model;

import jakarta.persistence.*;

import java.util.List;
import java.util.Map;
import java.util.Objects;

@Entity
@Table(name = "MAJOR")
@Inheritance(strategy = InheritanceType.JOINED)
public class Major {
    @Id
    @Column(name = "MAJOR_NAME")
    private String majorName;

    @ElementCollection
    @CollectionTable(name = "GRAD_REQUIREMENT", joinColumns = @JoinColumn(name = "MAJOR_NAME"))
    @MapKeyColumn(name = "REQUIREMENT_TYPE")
    @Column(name = "COURSE_UNIT")
    private Map<String, Double> gradRequirements;

    @OneToMany(mappedBy = "major", cascade = CascadeType.ALL)
    private List<Track> tracks;

    @OneToMany(mappedBy = "major", cascade = CascadeType.ALL)
    private List<Module> modules;

    public Major() {
    }

    public Major(String majorName) {
        this.majorName = majorName;
    }

    public String getMajorName() {
        return majorName;
    }

    public void setMajorName(String majorName) {
        this.majorName = majorName;
    }

    public Map<String, Double> getGradRequirements() {
        return gradRequirements;
    }

    public void setGradRequirements(Map<String, Double> gradRequirements) {
        this.gradRequirements = gradRequirements;
    }

    public List<Track> getTracks() {
        return tracks;
    }

    public void setTracks(List<Track> tracks) {
        this.tracks = tracks;
    }

    public List<Module> getModules() {
        return modules;
    }

    public void setModules(List<Module> modules) {
        this.modules = modules;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Major major = (Major) o;
        return Objects.equals(majorName, major.majorName) && Objects.equals(gradRequirements, major.gradRequirements) && Objects.equals(tracks, major.tracks) && Objects.equals(modules, major.modules);
    }

    @Override
    public int hashCode() {
        return Objects.hash(majorName, gradRequirements, tracks, modules);
    }

    @Override
    public String toString() {
        return "Major{" +
                "majorName='" + majorName + '\'' +
                ", gradRequirements=" + gradRequirements +
                ", tracks=" + tracks +
                ", modules=" + modules +
                '}';
    }
}
