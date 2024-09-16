package com.example.demo.model;

import com.example.demo.util.constant.GenderEnum;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;
import java.util.List;

@Document(value = "user")
@Getter
@Setter
public class User {

    @Id
    private String id;

    private String username;
    private String password;

    private String displayName;
    private String phoneNumber;
    private GenderEnum gender;
    private String birthday;
    private String profilePicture;
    private String backgroundPhoto;
    private String refreshToken;
    private int friendsCount;
    private int followersCount;
    private int postsCount;
    private String language;
    private String address;
    private List<String> friendIds;
    private List<String> followerIds;
    private List<String> postIds;
    private Instant createdAt;
    private Instant updatedAt;
    private String createdBy;
    private String updatedBy;

}


