package com.example.demo.util.error;

public class EmailNotVerifyException extends RuntimeException {
    public EmailNotVerifyException(String message) {
        super(message);
    }
}
