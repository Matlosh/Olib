package com.example.backend.services;

import com.example.backend.forms.ShelfForm;
import com.example.backend.models.Library;
import com.example.backend.models.Shelf;
import com.example.backend.models.User;
import com.example.backend.repositories.LibraryRepository;
import com.example.backend.repositories.ShelfRepository;
import com.example.backend.repositories.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
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
    private final UserService userService;
    private final LibraryService libraryService;

    @Autowired
    public ShelfService(ShelfRepository shelfRepository, UserService userService, LibraryService libraryService) {
        this.shelfRepository = shelfRepository;
        this.userService = userService;
        this.libraryService = libraryService;
    }

    public List<Shelf> getUserShelves(long userId) {
        Optional<Shelf> shelves = shelfRepository.findById(userId);
        return shelves.map(List::of).orElse(Collections.emptyList());
    }

    public Shelf createShelf(ShelfForm shelfForm, HttpServletRequest request, boolean isDefault) {
        Shelf shelf = new Shelf();
        shelf.setName(shelfForm.getName());

        Library library = libraryService.getUserLibrary(request);

        shelf.setLibrary(library);
        shelf.setDefault(isDefault);

        return shelfRepository.save(shelf);
    }
}
