package com.example.backend.data;

import java.util.Set;

public class PublicLibraryData {
    private String ownerName;
    private Set<ShelfData> shelves;

    public PublicLibraryData() {

    }

    public String getOwnerName() {
        return ownerName;
    }

    public void setOwnerName(String ownerName) {
        this.ownerName = ownerName;
    }

    public Set<ShelfData> getShelves() {
        return shelves;
    }

    public void setShelves(Set<ShelfData> shelves) {
        this.shelves = shelves;
    }
}
