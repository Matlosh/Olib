package com.example.backend.forms;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Set;

public class BookAttachForm {
    private Long bookId;
    private Set<Long> shelves;

    public BookAttachForm() {}

    public BookAttachForm(Long bookId, Set<Long> shelves) {
        this.bookId = bookId;
        this.shelves = shelves;
    }

    public Set<Long> getShelves() {
        return shelves;
    }

    public void setShelves(Set<Long> shelves) {
        this.shelves = shelves;
    }

    public Long getBookId() {
        return bookId;
    }

    public void setBookId(Long bookId) {
        this.bookId = bookId;
    }
}
