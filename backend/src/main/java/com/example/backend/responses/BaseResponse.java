package com.example.backend.responses;

import org.springframework.http.HttpStatus;

public class BaseResponse {
    private boolean success;
    private int status;
    private String message;

    public BaseResponse(boolean success, int status, String message) {
        this.success = success;
        this.status = status;
        this.message = message;
    }

    public BaseResponse(boolean success, String message) {
        this.success = success;
        this.message = message;
        this.status = HttpStatus.OK.value();
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
