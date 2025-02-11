package com.example.backend.controllers;

import com.example.backend.forms.LoginForm;
import com.example.backend.forms.RegisterForm;
import com.example.backend.repositories.UserRepository;
import com.example.backend.models.User;
import com.example.backend.responses.BaseResponse;
import com.example.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userService.getAll();
    }

    @PostMapping("/register")
    @ResponseBody
    public BaseResponse registerUser(@Validated @RequestBody RegisterForm form) {
        userService.createUser(form);
        return new BaseResponse(true, "New user account was created.");
    }

    @PostMapping("/login")
    @ResponseBody
    public BaseResponse loginUser(@Validated @RequestBody LoginForm form) {

        return new BaseResponse(true, "Logged in.");
    }
}
