package com.example.backend.controllers;

import com.example.backend.data.*;
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
    private final UserService userService;

    @Autowired
    public LibraryController(LibraryService libraryService, UserService userService) {
        this.libraryService = libraryService;
        this.userService = userService;
    }

    @GetMapping("/library")
    public LibraryData getUserLibrary(HttpServletRequest request) {
        userService.authenticate(request);
        return libraryService.getUserLibraryData(request);
    }

    // Public library fetching equals to fetching all the shelves
    @GetMapping("/libraries/{id}")
    public PublicLibraryData getLibrary(@PathVariable Long id) {
        libraryService.verifyLibraryPublic(id);
        return libraryService.getPublicLibrary(id);
    }

    // Fetches user/public library stats
    @GetMapping("/libraries/{id}/stats")
    public StatsData getLibraryStats(@PathVariable Long id) {
        libraryService.verifyLibraryPublic(id);
        return libraryService.getLibraryStats(id);
    }

    @GetMapping("/libraries/{id}/shelves/{shelfId}")
    public ShelfData getLibraryShelf(@PathVariable Long id, @PathVariable Long shelfId) {
        libraryService.verifyLibraryPublic(id);
        return libraryService.getLibraryShelf(id, shelfId);
    }

    @GetMapping("/libraries/{id}/shelves/{shelfId}/books")
    public Set<BookData> getLibraryShelfBooks(@PathVariable Long id, @PathVariable Long shelfId, @RequestParam("page") Integer page) {
        libraryService.verifyLibraryPublic(id);
        return libraryService.getLibraryShelfBooks(id, shelfId, page);
    }

    @PutMapping("/libraries/edit")
    public LibraryData editLibrary(@Validated @RequestBody LibraryForm libraryForm, HttpServletRequest request) {
        userService.authenticate(request);
        return new LibraryData(libraryService.editLibrary(libraryForm, request));
    }
}
