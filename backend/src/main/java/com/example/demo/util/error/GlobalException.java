package com.example.demo.util.error;

import com.example.demo.model.RestResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;
import java.util.stream.Collectors;

@RestControllerAdvice
public class GlobalException {

    @ExceptionHandler(value = {
            IdInvalidException.class,
            UsernameNotFoundException.class,
            BadCredentialsException.class
    })
//    public ResponseEntity<RestResponse<Object>> handleIdException(IdInvalidException idException) {
//        RestResponse<Object> res = new RestResponse<>();
//        res.setStatusCode(HttpStatus.BAD_REQUEST.value());
//        res.setError(idException.getMessage());
//        res.setMessage("Exception occurs...");
//        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
//    }
    public ResponseEntity<RestResponse<Object>> handleException(Exception ex) {
        RestResponse<Object> res = new RestResponse<>();
        HttpStatus status;

        if (ex instanceof IdInvalidException) {
            status = HttpStatus.BAD_REQUEST;
            res.setError(ex.getMessage());
        } else if (ex instanceof UsernameNotFoundException) {
            status = HttpStatus.NOT_FOUND;
            res.setError(ex.getMessage());
        } else if (ex instanceof BadCredentialsException) {
            status = HttpStatus.UNAUTHORIZED;
            res.setError(ex.getMessage());
        } else {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            res.setError("Unexpected error");
        }

        res.setStatusCode(status.value());
        res.setMessage("Exception occurs...");
        return ResponseEntity.status(status).body(res);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<RestResponse<Object>> validationError(MethodArgumentNotValidException ex) {
        BindingResult result = ex.getBindingResult();
        final List<FieldError> fieldErrors = result.getFieldErrors();

        RestResponse<Object> res = new RestResponse<Object>();
        res.setStatusCode(HttpStatus.BAD_REQUEST.value());
        res.setError(ex.getBody().getDetail());

        List<String> errors = fieldErrors.stream().map(f -> f.getDefaultMessage()).collect(Collectors.toList());
        res.setMessage(errors.size() > 1 ? errors : errors.get(0));

        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
    }
}
