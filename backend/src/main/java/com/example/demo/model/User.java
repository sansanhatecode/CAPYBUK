package com.example.demo.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(value = "user")
@Data
public class User {

    @Id
    private String id;

    private String username;

    private String password;

    private String displayName;

    private String phoneNumber;

    private String gender;

    private String birthday;

    private String profilePicture;

    private String backgroundPhoto;

    private int friendsCount;

    private int followersCount;

    private int postsCount;

    private String createdAt;

    private String updateAt;

    private String lastLogin;

    private String language;

    private Address address;

    private Bio bio;

    private Statistics statistics;

    private List<String> friendIds;

    private List<String> followerIds;

    private List<String> postIds;
}

@Data
class Address {
    private String street;
    private String city;
    private String state;
    private String country;
    private String postalCode;
}

@Data
class Bio {
    private String description;
    private String hobbies;
    private String occupation;
    private String website;
}

@Data
class Statistics {
    private int totalLikes;
    private int totalComments;
}
