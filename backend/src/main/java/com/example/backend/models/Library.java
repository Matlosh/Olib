package com.example.backend.models;

import jakarta.persistence.*;

import java.util.List;
import java.util.Set;

@Entity
@Table(name = "libraries")
public class Library {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "library", fetch = FetchType.LAZY)
    private Set<Shelf> shelves;

    public Library() {}

    public Library(User user) {
        this.user = user;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Set<Shelf> getShelves() {
        return shelves;
    }

    public void setShelves(Set<Shelf> shelves) {
        this.shelves = shelves;
    }

    @Override
    public String toString() {
        return "Library{" +
                "id=" + id +
                ", user=" + user +
                '}';
    }
}
