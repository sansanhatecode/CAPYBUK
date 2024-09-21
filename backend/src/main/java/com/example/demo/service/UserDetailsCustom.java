package com.example.demo.service;

import com.example.demo.repository.UserRepository;
import com.example.demo.util.error.EmailNotVerifyException;
import com.example.demo.util.helper.RandomStringGenerator;
import jakarta.mail.MessagingException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.Instant;

@Component("userDetailsService")
public class UserDetailsCustom implements UserDetailsService {

    private final UserService userService;
    private final UserRepository userRepository;

    public UserDetailsCustom(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException, EmailNotVerifyException {

        com.example.demo.model.User user = this.userService.handleGetUserByUsername(username);

        if (user == null) {
            throw new UsernameNotFoundException("Username/password không hợp lệ");
        }

        try {
            // Nếu tài khoản chưa được kích hoạt
            if (!user.isEnabled()) {
                // Tạo mã xác thực mới
                String newCode = RandomStringGenerator.generateRandomString();
                user.setVerificationCode(newCode);
                user.setVerificationDateExpired(Instant.now().plus(Duration.ofMinutes(5))); // Thời gian hết hạn là 5 phút
                this.userRepository.save(user); // Lưu thay đổi

                // Gửi email xác thực với mã mới
                this.userService.sendVerificationEmail(user);
                throw new EmailNotVerifyException("Account has not been verified. Please check email for new verification code.");
            }

            // Kiểm tra mã xác thực nếu tài khoản chưa được kích hoạt
            if (!user.getVerificationCode().equals(user.getVerificationCode()) ||
                    user.getVerificationDateExpired().isBefore(Instant.now())) {
                throw new EmailNotVerifyException("Verify code is invalid.");
            }
        } catch (MessagingException e) {
            // Xử lý lỗi gửi email
            throw new RuntimeException("Error when sending email verification", e);
        }

        return new CustomUserDetails(user);
    }
}
