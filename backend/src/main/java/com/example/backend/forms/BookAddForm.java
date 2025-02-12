package com.example.backend.forms;

public class BookAddForm {
    private String name;
    private String author;
    private String ISBN;
    private String image_url;

    public BookAddForm(String name, String author, String ISBN, String image_url) {
        this.name = name;
        this.author = author;
        this.ISBN = ISBN;
        this.image_url = image_url;
    }

    public BookAddForm(String name, String author, String ISBN) {
        this.name = name;
        this.author = author;
        this.ISBN = ISBN;
    }

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

    public String getImage_url() {
        return image_url;
    }

    public void setImage_url(String image_url) {
        this.image_url = image_url;
    }
}
