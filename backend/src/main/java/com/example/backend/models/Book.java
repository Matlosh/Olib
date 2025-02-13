package com.example.backend.models;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToMany
    @JoinTable(
            name = "shelves_books",
            joinColumns = @JoinColumn(name = "book_id"),
            inverseJoinColumns = @JoinColumn(name = "shelf_id")
    )
    private Set<Shelf> bookShelves = new HashSet<>();

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "author", nullable = false)
    private String author;

    @Column(name = "isbn", nullable = false)
    private String ISBN;

    @Column(name = "image_url")
    private String imageUrl;

    public Book() {}

    public Book(long id, String name, String author, String ISBN, String imageUrl) {
        this.id = id;
        this.name = name;
        this.author = author;
        this.ISBN = ISBN;
        this.imageUrl = imageUrl;
    }

    public Book(long id, Set<Shelf> bookShelves, String name, String author, String ISBN, String imageUrl) {
        this.id = id;
        this.bookShelves = bookShelves;
        this.name = name;
        this.author = author;
        this.ISBN = ISBN;
        this.imageUrl = imageUrl;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Set<Shelf> getBookShelves() {
        return bookShelves;
    }

    public void setBookShelves(Set<Shelf> bookShelves) {
        this.bookShelves = bookShelves;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getISBN() {
        return ISBN;
    }

    public void setISBN(String ISBN) {
        this.ISBN = ISBN;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }
}
