package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User handleCreateUser(User user) {
        return this.userRepository.save(user);
    }

    public void handleDeleteUser(String id) {
        this.userRepository.deleteById(id);
    }

    public User getUserById(String id) {
        Optional<User> userOptional = this.userRepository.findById(id);
        if (userOptional.isPresent()) {
            return userOptional.get();
        }
        return null;
    }

//    public List<User> getAllUsers() {
//        return this.userRepository.findAll();
//    }

    public User handleUpdateUser(User requestUser) {
        User currentUser = this.getUserById(requestUser.getId());
        if (currentUser != null) {
            currentUser.setUsername(requestUser.getUsername());
            currentUser.setPassword(requestUser.getPassword());

            // update user
            currentUser = this.userRepository.save(currentUser);
        }
        return currentUser;
    }

    public User handleGetUserByUsername(String username) {
        return this.userRepository.findByUsername(username);
    }
}
