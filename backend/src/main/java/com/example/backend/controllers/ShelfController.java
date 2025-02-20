package com.example.backend.controllers;

import com.example.backend.data.BookData;
import com.example.backend.data.ShelfData;
import com.example.backend.forms.ShelfEditForm;
import com.example.backend.forms.ShelfForm;
import com.example.backend.models.Shelf;
import com.example.backend.repositories.ShelfRepository;
import com.example.backend.responses.BaseResponse;
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

    // Allows to fetch more books from the given shelf
    @GetMapping("/shelves/{id}/books")
    public Set<BookData> getShelfBooks(@PathVariable Long id, @RequestParam("page") Integer page, HttpServletRequest request) {
        userService.authenticate(request);
        return shelfService.getShelfBooks(id, page);
    }

    @PostMapping("/shelves/add")
    public ShelfData addShelf(@Validated @RequestBody ShelfForm shelfForm, HttpServletRequest request) {
        userService.authenticate(request);
        return shelfService.addShelf(shelfForm, request);
    }

    @PutMapping("/shelves/edit")
    public ShelfData editShelf(@Validated @RequestBody ShelfEditForm shelfEditForm, HttpServletRequest request) {
        userService.authenticate(request);
        return shelfService.editShelf(shelfEditForm, request);
    }

    @DeleteMapping("/shelves/delete/{id}")
    public BaseResponse deleteShelf(@PathVariable Long id, HttpServletRequest request) {
        userService.authenticate(request);
        shelfService.deleteShelf(id, request);
        return new BaseResponse(true, 200, "Shelf was deleted.");
    }
}