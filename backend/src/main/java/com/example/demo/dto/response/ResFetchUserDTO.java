package com.example.demo.dto.response;

import com.example.demo.util.constant.GenderEnum;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.Instant;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ResFetchUserDTO {
    private String id;
    private String username;
    private String displayName;
    private GenderEnum gender;
    private String avatar;
    private String background;
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
}
