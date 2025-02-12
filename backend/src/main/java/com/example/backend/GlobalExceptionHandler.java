package com.example.backend;

import com.example.backend.exceptions.BadRequestException;
import com.example.backend.exceptions.ForbiddenException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.LinkedHashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private Map<String, Object> prepareResponse(String message, int status) {
        Map<String, Object> res = new LinkedHashMap<String, Object>();

        res.put("success", false);
        res.put("status", status);
        res.put("message", message);

        return res;
    }

    @ExceptionHandler({ RuntimeException.class })
    public ResponseEntity<?> runtimeException(Exception ex) {
        return new ResponseEntity<>(prepareResponse(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value()), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler({ BadRequestException.class })
    public ResponseEntity<?> badRequestException(Exception ex) {
        return new ResponseEntity<>(prepareResponse(ex.getMessage(), HttpStatus.BAD_REQUEST.value()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({ ForbiddenException.class })
    public ResponseEntity<?> forbiddenException(Exception ex) {
        return new ResponseEntity<>(prepareResponse(ex.getMessage(), HttpStatus.FORBIDDEN.value()), HttpStatus.FORBIDDEN);
    }
}
