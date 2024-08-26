package com.example.demo.util;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.*;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Service
public class SecurityUtil {

    private final JwtEncoder jwtEncoder;
    private final JwtDecoder jwtDecoder;


    public SecurityUtil(JwtEncoder jwtEncoder, @Qualifier("jwtDecoder") JwtDecoder jwtDecoder) {
        this.jwtEncoder = jwtEncoder;
        this.jwtDecoder = jwtDecoder;
    }

    public static final MacAlgorithm JWT_ALGORITHM = MacAlgorithm.HS512;

    @Value("${capybuk.jwt.token-validity-in-seconds}")
    private long jwtExpiration;

    @Value("${capybuk.jwt.refresh-token-validity-in-seconds}")
    private long refreshTokenExpiration;

    public String createToken(Authentication authentication) {
        Instant now = Instant.now();
        Instant validity = now.plus(this.jwtExpiration, ChronoUnit.SECONDS);

        // @formatter:off
        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuedAt(now)
                .expiresAt(validity)
                .subject(authentication.getName())
                .claim("hoidanit", authentication)
                .build();

        JwsHeader jwsHeader = JwsHeader.with(JWT_ALGORITHM).build();
        return this.jwtEncoder.encode(JwtEncoderParameters.from(jwsHeader,claims)).getTokenValue();
    }

    public String createRefreshToken(Authentication authentication) {
        Instant now = Instant.now();
        Instant validity = now.plus(this.refreshTokenExpiration, ChronoUnit.SECONDS);

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuedAt(now)
                .expiresAt(validity)
                .subject(authentication.getName())
                .claim("hoidanit", authentication)
                .build();

        JwsHeader jwsHeader = JwsHeader.with(JWT_ALGORITHM).build();
        return this.jwtEncoder.encode(JwtEncoderParameters.from(jwsHeader, claims)).getTokenValue();
    }

    public Authentication authenticateWithRefreshToken(String refreshToken, String accessToken) {
        try {
            // Decode the access token to check its expiration
            Jwt jwtAccessToken = jwtDecoder.decode(accessToken);
            Instant now = Instant.now();

            // Check if the access token is expired
            if (jwtAccessToken.getExpiresAt().isAfter(now)) {
                throw new RuntimeException("Access token is still valid. No need for refresh.");
            }

            // Decode the refresh token to authenticate
            Jwt jwtRefreshToken = jwtDecoder.decode(refreshToken);

            // Xác thực refresh token và trả về đối tượng Authentication
            return new UsernamePasswordAuthenticationToken(jwtRefreshToken.getSubject(), null, List.of());

        } catch (JwtException e) {
            // Handle invalid or expired refresh token
            throw new RuntimeException("Invalid or expired refresh token");
        }
    }
}
