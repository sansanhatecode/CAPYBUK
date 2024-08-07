package com.example.demo.model;

import lombok.Data;

@Data
public class RestResponse<T> {

    private int statusCode;

    private String error;

    // message co the la string hoac arraylist
    private Object message;

    private T data;
}
