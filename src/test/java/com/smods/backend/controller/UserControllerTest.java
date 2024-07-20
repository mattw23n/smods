// package com.smods.backend.controller;

// import com.smods.backend.dto.PlanDTO;
// import com.smods.backend.dto.UserDetailsDTO;
// import com.smods.backend.service.AuthorizationService;
// import com.smods.backend.service.UserService;
// import org.junit.jupiter.api.BeforeEach;
// import org.junit.jupiter.api.Test;
// import org.mockito.InjectMocks;
// import org.mockito.Mock;
// import org.mockito.MockitoAnnotations;
// import org.springframework.http.ResponseEntity;

// import java.util.Collections;

// import static org.junit.jupiter.api.Assertions.assertEquals;
// import static org.mockito.Mockito.*;

// public class UserControllerTest {

//     @Mock
//     private UserService userService;

//     @Mock
//     private AuthorizationService authorizationService;

//     @InjectMocks
//     private UserController userController;

//     @BeforeEach
//     public void setUp() {
//         MockitoAnnotations.openMocks(this);
//     }

//     @Test
//     public void testGetUserById_Success() {
//         Long userId = 1L;
//         UserDetailsDTO userDetails = new UserDetailsDTO(
//                 userId,
//                 "testuser",
//                 "testuser@example.com",
//                 "USER",
//                 Collections.emptyList()
//         );

//         when(userService.getUserById(userId)).thenReturn(userDetails);
//         doNothing().when(authorizationService).checkUserAuthorization(userId);

//         ResponseEntity<UserDetailsDTO> response = userController.getUserById(userId);
//         assertEquals(200, response.getStatusCodeValue());
//         assertEquals(userDetails, response.getBody());
//     }

//     @Test
//     public void testGetUserById_NotFound() {
//         Long userId = 1L;

//         when(userService.getUserById(userId)).thenReturn(null);
//         doNothing().when(authorizationService).checkUserAuthorization(userId);

//         ResponseEntity<UserDetailsDTO> response = userController.getUserById(userId);
//         assertEquals(404, response.getStatusCodeValue());
//     }
// }
