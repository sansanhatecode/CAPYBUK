package com.example.demo.service;

import com.example.demo.dto.request.ReqRegisterDTO;
import com.example.demo.dto.response.ResFetchUserDTO;
import com.example.demo.dto.response.ResUpdateUserDTO;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.util.error.IdInvalidException;
import com.example.demo.util.error.UserNotFoundException;
import com.example.demo.util.helper.RandomStringGenerator;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.File;
import java.time.Duration;
import java.time.Instant;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String fromAddress;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, JavaMailSender mailSender) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.mailSender = mailSender;
    }

    public void register(ReqRegisterDTO user) throws MessagingException {
        User newUser = new User();

        // save user information
        newUser.setUsername(user.getUsername());
        String hashPassword = this.passwordEncoder.encode(user.getPassword());
        newUser.setPassword(hashPassword);
        newUser.setDisplayName(user.getDisplayName());

        // create code and send email to verify
        String code = RandomStringGenerator.generateRandomString();
        newUser.setVerificationCode(code);
        newUser.setVerificationDateExpired(Instant.now().plus(Duration.ofMinutes(5)));
        newUser.setEnabled(false);

        this.userRepository.save(newUser);

        sendVerificationEmail(newUser);
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

    public void sendVerificationEmail(User user) throws MessagingException {
        String toAddress = user.getUsername();
        String subject = "Welcome to Capybuk! Please verify your email";
        String content = "<html>"
                + "<body style='font-family: Arial, sans-serif; background-color: #f1eae0b9; padding: 20px;'>"
                + "<div style='max-width: 600px; margin: auto; background-color: #fff; padding: 20px; border-radius: 10px;'>"
                + "<h1 style='text-align: center; color: #AD7D59;'>Welcome to Capybuk!</h1>"
                + "<p>Hi [[name]],</p>"
                + "<p>Wowwee! Thanks for registering an account with Capybuk. You're the coolest person around (and we can't wait for you to get started).</p>"
                + "<p>Before you get started, we'll need to verify your email. Please copy the code below to verify your email address:</p>"
                + "<div style='text-align: center; margin: 20px 0;'>"
                + "<p style='font-weight: bold; font-size: 20px;'>[[code]]</p>"
                + "</div>"
                + "<p>The email verification link will expire after 5 minutes.</p>"
                + "<p>If you did not register an account with Capybuk, please ignore this email.</p>"
                + "<p>Thank you,<br>The Capybuk Team</p>"
                + "<div style='text-align: right;'>"
                + "<img src='cid:image_logo' alt='Capybara with Camera' style='width: 100px; height: auto;'>"
                + "</div>"
                + "</div>"
                + "</body>"
                + "</html>";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setFrom(fromAddress);
        helper.setTo(toAddress);
        helper.setSubject(subject);

        // Customize the content with the user's display name and verification URL
        content = content.replace("[[name]]", user.getDisplayName());
        content = content.replace("[[code]]", user.getVerificationCode());

        helper.setText(content, true);

        try {
            Resource res = new FileSystemResource(new File("E:\\image\\capybara.png"));
            helper.addInline("image_logo", res);
        } catch (Exception e) {
            e.printStackTrace(); // In ra thông báo lỗi
        }


        mailSender.send(message);

    }

    public boolean isVerificationCodeValid(User user, String code) {
        return user.getVerificationCode().equals(code) && user.getVerificationDateExpired().isAfter(Instant.now());
    }

    public boolean verifyUserByCode(String verificationCode) {
        User user = userRepository.findByVerificationCode(verificationCode);
        if (user == null) {
            return false;  // Mã xác thực không hợp lệ
        }

        if (isVerificationCodeValid(user, verificationCode)) {
            // Xác thực thành công -> kích hoạt tài khoản
            user.setEnabled(true);
            userRepository.save(user);
            return true;
        }
        return false;  // Mã xác thực không hợp lệ hoặc đã hết hạn
    }

    public void sendCodeEmailForResetPassword(String username) throws MessagingException {
        String subject = "Reset your password!";
        String content = "<html>"
                + "<body style='font-family: Arial, sans-serif; background-color: #f1eae0b9; padding: 20px;'>"
                + "<div style='max-width: 600px; margin: auto; background-color: #fff; padding: 20px; border-radius: 10px;'>"
                + "<h1 style='text-align: center; color: #AD7D59;'>Password Reset Request</h1>"
                + "<p>Hi [[name]],</p>"
                + "<p>It looks like you requested to reset your password. No worries, we've got you covered!</p>"
                + "<p>Please copy the code below to reset your password:</p>"
                + "<div style='text-align: center; margin: 20px 0;'>"
                + "<p style='font-weight: bold; font-size: 20px;'>[[code]]</p>"
                + "</div>"
                + "<p>This code will expire in 5 minutes. If you didn't request a password reset, please ignore this email.</p>"
                + "<p>Thank you,<br>The Capybuk Team</p>"
                + "<div style='text-align: right;'>"
                + "<img src='cid:image_logo' alt='Capybara with Camera' style='width: 100px; height: auto;'>"
                + "</div>"
                + "</div>"
                + "</body>"
                + "</html>";

        String code = RandomStringGenerator.generateRandomString();

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);

        helper.setFrom(fromAddress);
        helper.setTo(username);
        helper.setSubject(subject);

        User user = this.handleGetUserByUsername(username);

        // Initial value for reset password
        user.setPasswordCode(code);
        user.setPasswordExpired(Instant.now());
        user.setPassEnabled(false);

        this.userRepository.save(user);

        // Customize the content with the user's display name and verification URL
        content = content.replace("[[name]]", user.getDisplayName());
        content = content.replace("[[code]]", user.getPasswordCode());

        helper.setText(content, true);

        try {
            Resource res = new FileSystemResource(new File("E:\\image\\capybara.png"));
            helper.addInline("image_logo", res);
        } catch (Exception e) {
            e.printStackTrace(); // In ra thông báo lỗi
        }

        mailSender.send(message);
    }

    public void resetPassword(String username, String code, String newPassword) throws UserNotFoundException, IdInvalidException {
        User user = this.handleGetUserByUsername(username);

        if (user == null) {
            throw new UserNotFoundException("Email not found!");
        }

        if (!user.getPasswordCode().equals(code)) {
            throw new IdInvalidException("Code is invalid!");
        }

        if (user.getPasswordExpired().isAfter(Instant.now())) {
            throw new IdInvalidException("Code is expired!");
        }

        // update new password and hash it
        String newHashPassword = this.passwordEncoder.encode(newPassword);
        user.setPassword(newHashPassword);
        user.setPassEnabled(true);
        this.userRepository.save(user);
    }

}
