package com.example.backend.controllers;

import com.example.backend.models.Shelf;
import com.example.backend.repositories.ShelfRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ShelfController {

    @Autowired
    private ShelfRepository shelfRepository;

    public ShelfController() {

    }

    public ShelfController(ShelfRepository shelfRepository) {
        this.shelfRepository = shelfRepository;
    }

    @GetMapping("/shelves")
    public List<Shelf> getAllShelves() {
        return shelfRepository.findAll();
    }

    @PostMapping("/shelves")
    public Shelf createShelf(@Validated @RequestBody Shelf shelf) {
        return shelfRepository.save(shelf);
    }
}
