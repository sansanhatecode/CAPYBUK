package com.example.demo.controller;

import com.example.demo.dto.response.ResFetchUserDTO;
import com.example.demo.dto.response.ResUpdateUserDTO;
import com.example.demo.model.User;
import com.example.demo.service.UserService;
import com.example.demo.util.annotation.ApiMessage;
import com.example.demo.util.error.IdInvalidException;
import com.example.demo.util.error.UserNotLoggedInException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1")
public class UserController {

    private final UserService userService;

    private final PasswordEncoder passwordEncoder;


    public UserController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    // GET A USER
    @GetMapping("/users/{id}")
    @ApiMessage("Get a user")
    public ResponseEntity<ResFetchUserDTO> getUserById(@PathVariable("id") String id) {
        User fetchUser = this.userService.getUserById(id);
        ResFetchUserDTO resFetchUserDTO = this.userService.convertFetchUserDTO(fetchUser);
        return ResponseEntity.status(HttpStatus.OK).body(resFetchUserDTO);
    }

    // UPDATE A USER
    @PutMapping("/users")
    @ApiMessage("Update a user")
    public ResponseEntity<ResUpdateUserDTO> updateUser(@RequestBody User requestUser) {
        String hashPassword = this.passwordEncoder.encode(requestUser.getPassword());
        requestUser.setPassword(hashPassword);
        User currentUser = userService.handleUpdateUser(requestUser);
        ResUpdateUserDTO resUpdateUserDTO = this.userService.convertUpdateUserDTO(currentUser);
        return ResponseEntity.status(HttpStatus.OK).body(resUpdateUserDTO);
    }

    // DELETE A USER
    @DeleteMapping("/users/{id}")
    @ApiMessage("Delete a user")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") String id) throws IdInvalidException, UserNotLoggedInException {
        if (id.length() != 24) {
            throw new IdInvalidException("ID is invalid");
        }
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        // Retrieve the user by username
        User user = this.userService.handleGetUserByUsername(username);

        // Check if the user is logged in
        if (user.getRefreshToken() == null) {
            throw new UserNotLoggedInException("No current user is logged in to perform delete");
        }

        if (!user.getId().equals(id)) {
            throw new IdInvalidException("You don't have permission to delete this user");
        }

        // Perform the user deletion
        this.userService.handleDeleteUser(id);

        return ResponseEntity.status(HttpStatus.OK).body(null);
    }
}
