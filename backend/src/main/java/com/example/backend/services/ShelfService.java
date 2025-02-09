package com.example.backend.services;

import com.example.backend.models.Shelf;
import com.example.backend.repositories.ShelfRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class ShelfService {

    private final ShelfRepository shelfRepository;

    @Autowired
    public ShelfService(ShelfRepository shelfRepository) {
        this.shelfRepository = shelfRepository;
    }

    public List<Shelf> getUserShelves(long userId) {
        Optional<Shelf> shelves = shelfRepository.findById(userId);
        return shelves.map(List::of).orElse(Collections.emptyList());
    }

    public Shelf createShelf(@Validated @RequestBody Shelf shelf) {
        return shelfRepository.save(shelf);
    }
}
