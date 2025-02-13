package com.example.backend.forms;

import com.example.backend.models.Shelf;

import java.util.HashSet;
import java.util.Set;

public class BookAddForm {
    private String name;
    private String author;
    private String ISBN = "";
    private String imageUrl = "";
    private Set<Long> shelves = new HashSet<>();

    public BookAddForm(String name, String author, String ISBN, String imageUrl, Set<Long> shelves) {
        this.name = name;
        this.author = author;
        this.ISBN = ISBN;
        this.imageUrl = imageUrl;
        this.shelves = shelves;
    }

    public BookAddForm(String name, String author, String ISBN, String imageUrl) {
        this.name = name;
        this.author = author;
        this.ISBN = ISBN;
        this.imageUrl = imageUrl;
    }

    public BookAddForm(String name, String author, String ISBN, Set<Long> shelves) {
        this.name = name;
        this.author = author;
        this.ISBN = ISBN;
        this.shelves = shelves;
    }

    public BookAddForm(String name, String author, String ISBN) {
        this.name = name;
        this.author = author;
        this.ISBN = ISBN;
    }

    public BookAddForm(String name, String author) {
        this.name = name;
        this.author = author;
    }

    public BookAddForm() {}

    public BookAddForm(String ISBN) {
        this.ISBN = ISBN;
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

    public Set<Long> getShelves() {
        return shelves;
    }

    public void setShelves(Set<Long> shelves) {
        this.shelves = shelves;
    }

    @Override
    public String toString() {
        return "BookAddForm{" +
                "name='" + name + '\'' +
                ", author='" + author + '\'' +
                ", ISBN='" + ISBN + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                ", shelves=" + shelves +
                '}';
    }
}
