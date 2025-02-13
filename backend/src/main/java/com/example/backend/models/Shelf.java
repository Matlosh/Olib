package com.example.backend.models;

import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "shelves")
public class Shelf {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "library_id")
    private Library library;

    @ManyToMany(mappedBy = "bookShelves")
    private Set<Book> books;

    private String name;

    @Column(name = "is_default", nullable = false)
    private boolean isDefault;

    public Shelf() {}

    public Shelf(Library library) {
        this.library = library;
    }

    public Shelf(long id) {
        this.id = id;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public Library getLibrary() {
        return library;
    }

    public void setLibrary(Library library) {
        this.library = library;
    }

    public Set<Book> getBooks() {
        return books;
    }

    public void setBooks(Set<Book> books) {
        this.books = books;
    }

    @Column(name = "name", nullable = false)
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

    @Override
    public String toString() {
        return "Shelf{" +
                "id=" + id +
                ", library=" + library +
                ", books=" + books +
                ", name='" + name + '\'' +
                '}';
    }
}
