package com.example.demo.controller;

import com.example.demo.dto.LoginDTO;
import com.example.demo.dto.ResLoginDTO;
import com.example.demo.dto.TokenResponse;
import com.example.demo.util.SecurityUtil;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthController {

    private final AuthenticationManagerBuilder authenticationManagerBuilder;

    private final SecurityUtil securityUtil;

    public AuthController(AuthenticationManagerBuilder authenticationManagerBuilder, SecurityUtil securityUtil) {
        this.authenticationManagerBuilder = authenticationManagerBuilder;
        this.securityUtil = securityUtil;
    }

    @PostMapping("/login")
    public ResponseEntity<ResLoginDTO> login(@Valid @RequestBody LoginDTO loginDto) {
        // Nạp input gồm username/password vào Security
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                loginDto.getUsername(), loginDto.getPassword());
        // xác thực người dùng => cần viết hàm loadUserByUsername
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);

        // create a token
        String access_token = this.securityUtil.createToken(authentication);

        // create refresh token
        String refresh_token = this.securityUtil.createRefreshToken(authentication);

        ResLoginDTO res = new ResLoginDTO();
        res.setAccessToken(access_token);
        res.setRefreshToken(refresh_token);
        return ResponseEntity.ok().body(res);
    }

    @PostMapping("/refresh-token")
    public ResponseEntity<?> refreshToken(@RequestBody ResLoginDTO tokenRequest) {
        try {
            // Extract access token and refresh token from the request
            String accessToken = tokenRequest.getAccessToken();
            String refreshToken = tokenRequest.getRefreshToken();

            // Authenticate with refresh token and expired access token
            Authentication authentication = securityUtil.authenticateWithRefreshToken(refreshToken, accessToken);

            // Generate new access token
            String newAccessToken = securityUtil.createToken(authentication);

            // Return the new access token to the client
            return ResponseEntity.ok(new TokenResponse(newAccessToken));

        } catch (RuntimeException e) {
            // Handle any exceptions (e.g., invalid tokens) and return an error response
            return ResponseEntity.status(401).body(e.getMessage());
        }
    }

}
