package com.example.backend.controllers;

import com.example.backend.data.ISBNBookData;
import com.example.backend.forms.BookAddForm;
import com.example.backend.models.Book;
import com.example.backend.services.BookService;
import com.example.backend.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@RestController
public class BookController {

    private final BookService bookService;
    private final UserService userService;

    @Autowired
    public BookController(BookService bookService, UserService userService) {
        this.bookService = bookService;
        this.userService = userService;
    }

    @GetMapping("/books/isbn/{isbn}")
    public ISBNBookData getBookDataByISBN(@PathVariable String isbn, HttpServletRequest request) {
        userService.authenticate(request);
        return bookService.getBookDataByISBN(isbn);
    }

    @PostMapping("/books/add")
    public Book addBook(@Validated @RequestBody BookAddForm bookAddForm, HttpServletRequest request) {
        userService.authenticate(request);
        return bookService.addBook(bookAddForm, request);
    }
}
