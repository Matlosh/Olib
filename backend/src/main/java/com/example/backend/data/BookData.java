package com.example.backend.data;

import com.example.backend.models.Book;
import com.example.backend.models.Shelf;

import java.util.Set;
import java.util.stream.Collectors;

public class BookData {
    private long id;
    private Set<Long> shelvesIds;
    private String name;
    private String author;
    private String ISBN;
    private String imageUrl;
    private int score;
    private boolean isScored;

    public BookData(long id, Set<Long> shelvesIds, String name, String author, String ISBN, String imageUrl, int score, boolean isScored) {
        this.id = id;
        this.shelvesIds = shelvesIds;
        this.name = name;
        this.author = author;
        this.ISBN = ISBN;
        this.imageUrl = imageUrl;
        this.score = score;
        this.isScored = isScored;
    }

    public BookData(Book book) {
        this.id = book.getId();
        this.shelvesIds = book.getBookShelves().stream().map(Shelf::getId).collect(Collectors.toSet());
        this.name = book.getName();
        this.author = book.getAuthor();
        this.ISBN = book.getISBN();
        this.imageUrl = book.getImageUrl();
        this.score = book.getScore();
        this.isScored = book.isScored();
    }

    public BookData() {

    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Set<Long> getShelvesIds() {
        return shelvesIds;
    }

    public void setShelvesIds(Set<Long> shelvesIds) {
        this.shelvesIds = shelvesIds;
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

    @Override
    public String toString() {
        return "BookData{" +
                "id=" + id +
                ", shelvesIds=" + shelvesIds +
                ", name='" + name + '\'' +
                ", author='" + author + '\'' +
                ", ISBN='" + ISBN + '\'' +
                ", imageUrl='" + imageUrl + '\'' +
                ", score=" + score +
                ", isScored=" + isScored +
                '}';
    }
}
