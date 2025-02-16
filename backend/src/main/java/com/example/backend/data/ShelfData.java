package com.example.backend.data;

import com.example.backend.models.Book;
import com.example.backend.models.Shelf;

import java.util.HashSet;
import java.util.Set;

public class ShelfData {
    private Long id;
    private Set<BookData> books;
    private String name;
    private boolean isDefault;
    private Long booksCount;

    public ShelfData(Shelf shelf) {
        this.id = shelf.getId();
        this.name = shelf.getName();
        this.isDefault = shelf.isDefault();

        Set<BookData> booksData = new HashSet<>();

        Set<Book> books = shelf.getBooks();
        if(books != null) {
            this.booksCount = (long) books.size();
            books.forEach(b -> booksData.add(new BookData(b)));
        } else {
            this.booksCount = 0L;
        }

        this.books = booksData;
    }

    public ShelfData() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Set<BookData> getBooks() {
        return books;
    }

    public void setBooks(Set<BookData> books) {
        this.books = books;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isDefault() {
        return isDefault;
    }

    public void setDefault(boolean aDefault) {
        isDefault = aDefault;
    }

    public Long getBooksCount() {
        return booksCount;
    }

    public void setBooksCount(Long booksCount) {
        this.booksCount = booksCount;
    }
}
