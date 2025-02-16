package com.example.backend.models;

import com.example.backend.forms.BookAddForm;
import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "books")
public class Book {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

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

    @Column(name = "score")
    private int score;

    @Column(name = "is_scored")
    private boolean isScored = false;

    public Book() {}

    public Book(Long id, Set<Shelf> bookShelves, String name, String author, String ISBN, String imageUrl, int score, boolean isScored) {
        this.id = id;
        this.bookShelves = bookShelves;
        this.name = name;
        this.author = author;
        this.ISBN = ISBN;
        this.imageUrl = imageUrl;
        this.score = score;
        this.isScored = isScored;
    }

    public Book(Long id, String name, String author, String ISBN, String imageUrl, int score, boolean isScored) {
        this.id = id;
        this.name = name;
        this.author = author;
        this.ISBN = ISBN;
        this.imageUrl = imageUrl;
        this.score = score;
        this.isScored = isScored;
    }

    public Book(Long id, String name, String author, String ISBN, String imageUrl, int score) {
        this.id = id;
        this.name = name;
        this.author = author;
        this.ISBN = ISBN;
        this.imageUrl = imageUrl;
        this.score = score;
        this.isScored = true;
    }

    public Book(Long id, String name, String author, String ISBN, String imageUrl) {
        this.id = id;
        this.name = name;
        this.author = author;
        this.ISBN = ISBN;
        this.imageUrl = imageUrl;
    }

    public Book(Long id, Set<Shelf> bookShelves, String name, String author, String ISBN, String imageUrl) {
        this.id = id;
        this.bookShelves = bookShelves;
        this.name = name;
        this.author = author;
        this.ISBN = ISBN;
        this.imageUrl = imageUrl;
    }

    public Book(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
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

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public boolean isScored() {
        return isScored;
    }

    public void setScored(boolean scored) {
        isScored = scored;
    }
}
