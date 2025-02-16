package com.example.backend.services;

import com.example.backend.data.BookData;
import com.example.backend.data.ShelfData;
import com.example.backend.forms.ShelfForm;
import com.example.backend.models.Book;
import com.example.backend.models.Library;
import com.example.backend.models.Shelf;
import com.example.backend.models.User;
import com.example.backend.repositories.BookRepository;
import com.example.backend.repositories.LibraryRepository;
import com.example.backend.repositories.ShelfRepository;
import com.example.backend.repositories.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.*;

@Service
public class ShelfService {

    private final ShelfRepository shelfRepository;
    private final UserService userService;
    private final LibraryService libraryService;
    private final BookRepository bookRepository;

    @Autowired
    public ShelfService(ShelfRepository shelfRepository, UserService userService, LibraryService libraryService, BookRepository bookRepository) {
        this.shelfRepository = shelfRepository;
        this.userService = userService;
        this.libraryService = libraryService;
        this.bookRepository = bookRepository;
    }

    public Shelf addShelf(ShelfForm shelfForm, HttpServletRequest request, boolean isDefault) {
        Shelf shelf = new Shelf();
        shelf.setName(shelfForm.getName());

        Library library = libraryService.getUserLibrary(request);

        shelf.setLibrary(library);
        shelf.setDefault(isDefault);

        return shelfRepository.save(shelf);
    }

    public ShelfData addShelf(ShelfForm shelfForm, HttpServletRequest request) {
        Shelf shelf = addShelf(shelfForm, request, false);
        return new ShelfData(shelfRepository.save(shelf));
    }

    public Set<ShelfData> getAllShelves(HttpServletRequest request) {
        Library library = libraryService.getUserLibrary(request);
        Set<Shelf> shelves = shelfRepository.findByLibrary(library);

        Set<ShelfData> shelvesData = new HashSet<>();

        for(final Shelf shelf : shelves) {
            ShelfData shelfData = new ShelfData();
            shelfData.setId(shelf.getId());
            shelfData.setName(shelf.getName());
            shelfData.setBooksCount((long) shelf.getBooks().size());
            shelfData.setDefault(shelf.isDefault());

            List<Book> books = bookRepository.findAllByBookShelves(shelf, PageRequest.of(0, 4, Sort.by("id").descending()));
            Set<BookData> booksData = new HashSet<>();

            books.forEach(b -> booksData.add(new BookData(b)));

            shelfData.setBooks(booksData);

            shelvesData.add(shelfData);
        }

        return shelvesData;
    }
}
