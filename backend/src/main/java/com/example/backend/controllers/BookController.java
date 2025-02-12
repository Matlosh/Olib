package com.example.backend.controllers;

import com.example.backend.data.ISBNBookData;
import com.example.backend.forms.BookAddForm;
import com.example.backend.models.Book;
import com.example.backend.services.BookService;
import com.example.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BookController {

    private final BookService bookService;
    private final UserService userService;

    @Autowired
    public BookController(BookService bookService, UserService userService) {
        this.bookService = bookService;
        this.userService = userService;
    }

    /*
    @PostMapping("/books/add")
    public Book addBook(@Validated @RequestBody BookAddForm bookAddForm) {

    }

    @GetMapping("/books/isbn/{isbn}")
    public ISBNBookData getBookDataByISBN() {

    }
     */
}
