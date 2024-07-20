package com.smods.backend.service;

import com.smods.backend.dto.PlanDTO;
import com.smods.backend.dto.UserDTO;
import com.smods.backend.dto.UserDetailsDTO;
import com.smods.backend.model.PlanModuleGPA;
import com.smods.backend.model.User;
import com.smods.backend.repository.PlanRepository;
import com.smods.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PlanRepository planRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PlanRepository planRepository) {
        this.userRepository = userRepository;
        this.planRepository = planRepository;
        this.passwordEncoder = new BCryptPasswordEncoder();
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Optional<User> findByUsernameOrEmail(String identifier) {
        Optional<User> userOpt = userRepository.findByUsername(identifier);
        if (userOpt.isEmpty()) {
            userOpt = userRepository.findByEmail(identifier);
        }
        return userOpt;
    }

    public User updateUser(Long id, UserDTO userDTO) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User user = optionalUser.get();
            user.setUsername(userDTO.getUsername());
            user.setEmail(userDTO.getEmail());
            if (!userDTO.getPassword().isEmpty()) {
                user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
            }
            return userRepository.save(user);
        } else {
            throw new RuntimeException("User not found with id: " + id);
        }
    }

    public User findById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public UserDetailsDTO getUserById(Long id) {
        User user = userRepository.findById(id).orElse(null);
        if (user == null) {
            return null;
        }

        List<PlanDTO> planDTOs = user.getPlans().stream().map(plan -> {
            List<PlanModuleGPA> planModuleGPAs = plan.getPlanModuleGPAs();
            return new PlanDTO(
                    plan.getPlanKey().getPlanId(),
                    plan.getPlanName(),
                    plan.getDegree().getDegreeName(),
                    plan.getFirstMajor().getMajorName(),
                    plan.getSecondMajor().getMajorName(),
                    plan.getCreationDateTime(),
                    planModuleGPAs // Pass the list of PlanModuleGPA
            );
        }).collect(Collectors.toList());

        return new UserDetailsDTO(
                user.getUserId(),
                user.getUsername(),
                user.getEmail(),
                user.getRole(),
                planDTOs
        );
    }
}