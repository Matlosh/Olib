package com.example.backend.controllers;

import com.example.backend.data.ShelfData;
import com.example.backend.forms.ShelfForm;
import com.example.backend.models.Shelf;
import com.example.backend.repositories.ShelfRepository;
import com.example.backend.services.ShelfService;
import com.example.backend.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
public class ShelfController {

    private final ShelfService shelfService;
    private final UserService userService;

    @Autowired
    public ShelfController(ShelfService shelfService, UserService userService) {
        this.shelfService = shelfService;
        this.userService = userService;
    }

    @GetMapping("/shelves")
    public Set<ShelfData> getAllShelves(HttpServletRequest request) {
        userService.authenticate(request);
        return shelfService.getAllShelves(request);
    }

    @PostMapping("/shelves/add")
    public ShelfData addShelf(@Validated @RequestBody ShelfForm shelfForm, HttpServletRequest request) {
        userService.authenticate(request);
        return shelfService.addShelf(shelfForm, request);
    }
}