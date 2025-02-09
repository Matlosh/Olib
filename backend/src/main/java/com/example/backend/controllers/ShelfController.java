package com.example.backend.controllers;

import com.example.backend.models.Shelf;
import com.example.backend.repositories.ShelfRepository;
import com.example.backend.services.ShelfService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class ShelfController {

    private final ShelfService shelfService;


    public ShelfController(ShelfService shelfService) {
        this.shelfService = shelfService;
    }

    @GetMapping("/users/{id}/shelves")
    public List<Shelf> getAllShelves(@PathVariable long id) {
        return shelfService.getUserShelves(id);
    }

    @PostMapping("/shelves")
    public Shelf createShelf(@Validated @RequestBody Shelf shelf) {
        return shelfService.createShelf(shelf);
    }
}