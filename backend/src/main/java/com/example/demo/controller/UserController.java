package com.example.demo.controller;

import com.example.demo.model.User;
import com.example.demo.service.UserService;
import com.example.demo.util.error.IdInvalidException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    private final UserService userService;

    private final PasswordEncoder passwordEncoder;


    public UserController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/users")
    public ResponseEntity<User> createNewUser(@RequestBody User postManUser) {
        String hashPassword = this.passwordEncoder.encode(postManUser.getPassword());
        postManUser.setPassword(hashPassword);
        User apiUser = userService.handleCreateUser(postManUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(apiUser);
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable("id") String id) throws IdInvalidException {
        if (id.length() != 24) {
            throw new IdInvalidException("ID khong hop le");
        }
        this.userService.handleDeleteUser(id);
        return ResponseEntity.status(HttpStatus.OK).body("Delete user with id: " + id);
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable("id") String id) {
        User fetchUser = this.userService.getUserById(id);
        return ResponseEntity.status(HttpStatus.OK).body(fetchUser);
    }

//    @GetMapping("/users")
//    public ResponseEntity<List<User>> getAllUsers() {
//        return ResponseEntity.status(HttpStatus.OK).body(this.userService.getAllUsers());
//    }

    @PutMapping("/users")
    public ResponseEntity<User> updateUser(@RequestBody User requestUser) {
        String hashPassword = this.passwordEncoder.encode(requestUser.getPassword());
        requestUser.setPassword(hashPassword);
        User currentUser = userService.handleUpdateUser(requestUser);
        return ResponseEntity.status(HttpStatus.OK).body(currentUser);
    }
}
