package com.example.backend.repositories;

import com.example.backend.models.Book;
import com.example.backend.models.Shelf;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    List<Book> findAllByBookShelves(Shelf shelf, Pageable pageable);
    List<Book> findAllByNameContainingIgnoreCase(String name, Pageable pageable);

}
