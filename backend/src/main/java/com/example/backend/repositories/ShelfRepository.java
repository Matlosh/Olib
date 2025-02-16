package com.example.backend.repositories;

import com.example.backend.models.Library;
import com.example.backend.models.Shelf;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface ShelfRepository extends JpaRepository<Shelf, Long> {

    Set<Shelf> findByLibrary(Library library);
    Shelf findByIsDefaultTrueAndLibrary(Library library);

}
