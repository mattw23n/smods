package com.smods.backend.model;

import com.smods.backend.model.composite_key.MajorModuleKey;
import jakarta.persistence.*;

import java.util.Objects;

@Entity
@Table(name = "MAJOR_MODULE")
public class MajorModule {
    @EmbeddedId
    private MajorModuleKey majorModuleId;

    @ManyToOne
    @MapsId("majorName")
    @JoinColumn(name = "MAJOR_NAME")
    private Major major;

    @ManyToOne
    @MapsId("moduleId")
    @JoinColumn(name = "MODULE_ID")
    private Module module;

    @Column(name = "GRAD_REQUIREMENT")
    private String gradRequirement;

    @Column(name = "BASKET")
    private String basket;

    @Column(name = "TRACK_NAME")
    private String trackName;

    public MajorModule() {
    }

    public MajorModule(MajorModuleKey majorModuleId, String gradRequirement, String basket, String trackName) {
        this.gradRequirement = gradRequirement;
        this.basket = basket;
        this.trackName = trackName;
    }

    public MajorModuleKey getMajorModuleId() {
        return majorModuleId;
    }

    public void setMajorModuleId(MajorModuleKey majorModuleId) {
        this.majorModuleId = majorModuleId;
    }

    public Major getMajor() {
        return major;
    }

    public void setMajor(Major major) {
        this.major = major;
    }

    public Module getModule() {
        return module;
    }

    public void setModule(Module module) {
        this.module = module;
    }

    public String getGradRequirement() {
        return gradRequirement;
    }

    public void setGradRequirement(String gradRequirement) {
        this.gradRequirement = gradRequirement;
    }

    public String getBasket() {
        return basket;
    }

    public void setBasket(String basket) {
        this.basket = basket;
    }

    public String getTrackName() {
        return trackName;
    }

    public void setTrackName(String trackName) {
        this.trackName = trackName;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        MajorModule that = (MajorModule) o;
        return Objects.equals(majorModuleId, that.majorModuleId) && Objects.equals(major, that.major) && Objects.equals(module, that.module) && Objects.equals(gradRequirement, that.gradRequirement) && Objects.equals(basket, that.basket);
    }

    @Override
    public int hashCode() {
        return Objects.hash(majorModuleId, major, module, gradRequirement, basket);
    }

    @Override
    public String toString() {
        return "MajorModule{" +
                "majorModuleId=" + majorModuleId +
                ", major=" + major +
                ", module=" + module +
                ", gradRequirement='" + gradRequirement + '\'' +
                ", basket='" + basket + '\'' +
                '}';
    }
}
