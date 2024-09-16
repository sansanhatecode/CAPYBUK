package com.example.demo.dto;

import lombok.*;

@Data
public class ResLoginDTO {
    private String accessToken;
    private UserLogin user;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UserLogin {
        private String id;
        private String email;
        private String name;
    }
}
