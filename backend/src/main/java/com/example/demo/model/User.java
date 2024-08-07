package com.example.demo.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(value = "user")
@Data
public class User {

    @Id
    private String id;

    private String username;

    private String password;
}
