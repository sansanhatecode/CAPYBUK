package com.example.demo.service;

import com.example.demo.dto.response.ResFetchUserDTO;
import com.example.demo.dto.response.ResUpdateUserDTO;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public void handleCreateUser(User user) {
        this.userRepository.save(user);
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

    public User handleUpdateUser(User requestUser) {
        User currentUser = this.getUserById(requestUser.getId());
        if (currentUser != null) {
            currentUser.setUsername(requestUser.getUsername());
            currentUser.setPassword(requestUser.getPassword());
            currentUser.setDisplayName(requestUser.getDisplayName());
            currentUser.setGender(requestUser.getGender());
            currentUser.setBirthday(requestUser.getBirthday());
            currentUser.setAddress(requestUser.getAddress());
            currentUser.setAvatar(requestUser.getAvatar());
            currentUser.setBackground(requestUser.getBackground());
            currentUser.setFriendsCount(requestUser.getFriendsCount());
            currentUser.setFollowersCount(requestUser.getFollowersCount());
            currentUser.setUpdatedAt(requestUser.getUpdatedAt());
            // update user
            currentUser = this.userRepository.save(currentUser);
        }
        return currentUser;
    }

    public User handleGetUserByUsername(String username) {
        return this.userRepository.findByUsername(username);
    }

    public void updateUserToken(String token, String username) {
        User currentUser = this.handleGetUserByUsername(username);
        if (currentUser != null) {
            currentUser.setRefreshToken(token);
            this.userRepository.save(currentUser);
        }
    }

    public User getUserByRefreshTokenAndUsername(String token, String username) {
        return this.userRepository.findByRefreshTokenAndUsername(token, username);
    }

    public boolean handleExistByUsername(String username) {
        return this.userRepository.existsByUsername(username);
    }

    public ResFetchUserDTO convertFetchUserDTO(User fetchUser) {
        ResFetchUserDTO resFetchUserDTO = new ResFetchUserDTO();

        resFetchUserDTO.setId(fetchUser.getId());
        resFetchUserDTO.setUsername(fetchUser.getUsername());
        resFetchUserDTO.setDisplayName(fetchUser.getDisplayName());
        resFetchUserDTO.setGender(fetchUser.getGender());
        resFetchUserDTO.setAvatar(fetchUser.getAvatar());
        resFetchUserDTO.setBackground(fetchUser.getBackground());
        resFetchUserDTO.setFriendsCount(fetchUser.getFriendsCount());
        resFetchUserDTO.setFollowersCount(fetchUser.getFollowersCount());
        resFetchUserDTO.setAddress(fetchUser.getAddress());
        resFetchUserDTO.setCreatedAt(fetchUser.getCreatedAt());
        resFetchUserDTO.setUpdatedAt(fetchUser.getUpdatedAt());

        return resFetchUserDTO;
    }

    public ResUpdateUserDTO convertUpdateUserDTO(User fetchUser) {
        ResUpdateUserDTO resUpdateUserDTO = new ResUpdateUserDTO();

        resUpdateUserDTO.setId(fetchUser.getId());
        resUpdateUserDTO.setUsername(fetchUser.getUsername());
        resUpdateUserDTO.setDisplayName(fetchUser.getDisplayName());
        resUpdateUserDTO.setGender(fetchUser.getGender());
        resUpdateUserDTO.setAvatar(fetchUser.getAvatar());
        resUpdateUserDTO.setBackground(fetchUser.getBackground());
        resUpdateUserDTO.setFriendsCount(fetchUser.getFriendsCount());
        resUpdateUserDTO.setFollowersCount(fetchUser.getFollowersCount());
        resUpdateUserDTO.setAddress(fetchUser.getAddress());
        resUpdateUserDTO.setUpdatedAt(fetchUser.getUpdatedAt());

        return resUpdateUserDTO;
    }
}
