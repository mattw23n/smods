package com.smods.backend.controller;

import com.smods.backend.dto.UserDTO;
import com.smods.backend.dto.UserDetailsDTO;
import com.smods.backend.model.User;
import com.smods.backend.service.AuthorizationService;
import com.smods.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthorizationService authorizationService;

    @GetMapping("/{id}")
    public ResponseEntity<UserDetailsDTO> getUserById(@PathVariable Long id) {
        authorizationService.checkUserAuthorization(id); // Authorization check
        UserDetailsDTO userDetails = userService.getUserById(id);
        if (userDetails != null) {
            return ResponseEntity.ok(userDetails);
        } else {
            return ResponseEntity.status(404).body(null);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody UserDTO userDTO) {
        authorizationService.checkUserAuthorization(id); // Authorization check
        User updatedUser = userService.updateUser(id, userDTO);
        return ResponseEntity.ok(updatedUser);
    }
}