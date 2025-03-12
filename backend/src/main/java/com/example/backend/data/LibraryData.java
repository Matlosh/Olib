package com.example.backend.data;

import com.example.backend.models.Library;

public class LibraryData {
    private Long id;
    private boolean isPublic;

    public LibraryData() {

    }

    public LibraryData(Library library) {
        this.id = library.getId();
        this.isPublic = library.isPublic();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public boolean isPublic() {
        return isPublic;
    }

    public void setPublic(boolean aPublic) {
        isPublic = aPublic;
    }
}
