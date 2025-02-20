package com.example.backend.forms;

import jakarta.validation.constraints.NotNull;

public class ShelfEditForm extends ShelfForm {
    @NotNull
    private Long id = null;

    public ShelfEditForm(String name, Long id) {
        super(name);
        this.id = id;
    }

    public @NotNull Long getId() {
        return id;
    }

    public void setId(@NotNull Long id) {
        this.id = id;
    }
}
