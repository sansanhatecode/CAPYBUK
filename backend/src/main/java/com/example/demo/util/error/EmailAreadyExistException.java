package com.example.demo.util.error;

public class EmailAreadyExistException extends Exception {
    public EmailAreadyExistException(String message) {
        super(message);
    }
}
