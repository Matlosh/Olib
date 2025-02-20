package com.example.backend.controllers;

import com.example.backend.data.BookData;
import com.example.backend.data.ShelfData;
import com.example.backend.forms.LibraryForm;
import com.example.backend.responses.BaseResponse;
import com.example.backend.services.LibraryService;
import com.example.backend.services.ShelfService;
import com.example.backend.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RestController
public class LibraryController {

    private final LibraryService libraryService;
    private final ShelfService shelfService;
    private final UserService userService;

    @Autowired
    public LibraryController(LibraryService libraryService, ShelfService shelfService, UserService userService) {
        this.libraryService = libraryService;
        this.shelfService = shelfService;
        this.userService = userService;
    }

    // Public library fetching equals to fetching all the shelves
    @GetMapping("/libraries/{id}")
    public Set<ShelfData> getLibrary(@PathVariable Long id) {
        libraryService.verifyLibraryPublic(id);
        return shelfService.getAllShelves(id);
    }

    @GetMapping("/libraries/{id}/shelves/{shelfId}/books")
    public Set<BookData> getLibraryShelfBooks(@PathVariable Long id, @PathVariable Long shelfId, @RequestParam("page") Integer page) {
        libraryService.verifyLibraryPublic(id);
        return shelfService.getShelfBooks(shelfId, page);
    }

    @PutMapping("/libraries/edit")
    public BaseResponse editLibrary(@Validated @RequestBody LibraryForm libraryForm, HttpServletRequest request) {
        userService.authenticate(request);
        libraryService.editLibrary(libraryForm, request);
        return new BaseResponse(true, 200, "Library was edited.");
    }
}
