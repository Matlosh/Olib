package com.example.backend.forms;

import jakarta.validation.constraints.*;
import org.springframework.lang.NonNull;

public class BookEditForm extends BookAddForm {
    @NotNull
    private Long id = null;

    public BookEditForm(Long id) {
        this.id = id;
    }

    public @NotNull Long getId() {
        return id;
    }

    public void setId(@NotNull Long id) {
        this.id = id;
    }
}
