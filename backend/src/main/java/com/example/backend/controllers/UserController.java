package com.example.backend.controllers;

import com.example.backend.data.UserData;
import com.example.backend.forms.LoginForm;
import com.example.backend.forms.RegisterForm;
import com.example.backend.models.User;
import com.example.backend.responses.BaseResponse;
import com.example.backend.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    /*
    @GetMapping("/users")
    public List<User> getAllUsers(HttpServletRequest request) {
        return userService.getAll();
    }
     */

    @PostMapping("/user/register")
    public BaseResponse registerUser(@Validated @RequestBody RegisterForm form) {
        userService.registerUser(form);
        return new BaseResponse(true, "New user account was created.");
    }

    @PostMapping("/user/login")
    public BaseResponse loginUser(@Validated @RequestBody LoginForm form, HttpServletRequest request) {
        userService.loginUser(form, request);
        return new BaseResponse(true, "Logged in.");
    }

    @PostMapping("/user/logout")
    public BaseResponse logoutUser(HttpServletRequest request) {
        userService.logoutUser(request);
        return new BaseResponse(true, "Logged out.");
    }

    @GetMapping("/user")
    public UserData getMe(HttpServletRequest request) {
        userService.authenticate(request);
        return userService.getMe(request);
    }
}
