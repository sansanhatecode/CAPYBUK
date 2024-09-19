package com.example.demo.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReqRegisterDTO {

    @NotBlank(message = "Email can not blank")
    private String username;

    @NotBlank(message = "Password can not blank")
    private String password;

    @NotBlank(message = "Name can not blank")
    private String displayName;
}
