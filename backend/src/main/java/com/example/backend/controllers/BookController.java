package com.example.backend.controllers;

import com.example.backend.data.BookData;
import com.example.backend.data.CoverUploadData;
import com.example.backend.data.ISBNBookData;
import com.example.backend.data.ShelfData;
import com.example.backend.forms.BookAddForm;
import com.example.backend.forms.BookAttachForm;
import com.example.backend.forms.BookEditForm;
import com.example.backend.models.Book;
import com.example.backend.responses.BaseResponse;
import com.example.backend.services.BookService;
import com.example.backend.services.UserService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Set;

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

    // Fetches all shelves that book with this id contains
    @GetMapping("/books/{id}/shelves")
    public Set<ShelfData> getBookShelves(@PathVariable Long id, HttpServletRequest request) {
        userService.authenticate(request);
        return bookService.getBookShelves(id, request);
    }

    @PostMapping("/books/add")
    public BookData addBook(@Validated @RequestBody BookAddForm bookAddForm, HttpServletRequest request) {
        userService.authenticate(request);
        return bookService.addBook(bookAddForm, request);
    }

    @PostMapping("/books/{id}/cover/upload")
    public CoverUploadData uploadCover(@RequestParam("file") MultipartFile file, @PathVariable Long id, HttpServletRequest request) {
        userService.authenticate(request);
        return bookService.uploadCover(file, id, request);
    }

    @DeleteMapping("/books/{id}/cover/delete")
    public BaseResponse deleteCover(@PathVariable Long id, HttpServletRequest request) {
        userService.authenticate(request);
        bookService.deleteCover(id, request);
        return new BaseResponse(true, 200, "Book's cover was deleted.");
    }

    @PutMapping("/books/edit")
    public BookData editBook(@Validated @RequestBody BookEditForm bookEditForm, HttpServletRequest request) {
        userService.authenticate(request);
        return bookService.editBook(bookEditForm, request);
    }

    @DeleteMapping("/books/delete/{id}")
    public BaseResponse deleteBook(@PathVariable Long id, HttpServletRequest request) {
        userService.authenticate(request);
        bookService.deleteBook(id, request);
        return new BaseResponse(true, 200, "Book was deleted.");
    }

    // add to shelf/shelves
    @PostMapping("/books/attach")
    public BaseResponse attachBook(@Validated @RequestBody BookAttachForm bookAttachForm, HttpServletRequest request) {
        userService.authenticate(request);
        bookService.addBookToShelves(bookAttachForm, request);
        return new BaseResponse(true, 200, "Book was added to the shelf(ves).");
    }

    // remove from shelf/shelves
    @DeleteMapping("/books/detach")
    public BaseResponse detachBook(@Validated @RequestBody BookAttachForm bookDetachForm, HttpServletRequest request) {
        userService.authenticate(request);
        bookService.removeBookFromShelves(bookDetachForm, request);
        return new BaseResponse(true, 200, "Book has been removed from the shelf(ves).");
    }
}
