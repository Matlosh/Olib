package com.example.backend.services;

import com.example.backend.data.BookData;
import com.example.backend.data.PublicLibraryData;
import com.example.backend.data.ShelfData;
import com.example.backend.exceptions.MethodNotAllowedException;
import com.example.backend.forms.ShelfEditForm;
import com.example.backend.forms.ShelfForm;
import com.example.backend.models.Book;
import com.example.backend.models.Library;
import com.example.backend.models.Shelf;
import com.example.backend.models.User;
import com.example.backend.repositories.BookRepository;
import com.example.backend.repositories.LibraryRepository;
import com.example.backend.repositories.ShelfRepository;
import com.example.backend.repositories.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class ShelfService {

    private final ShelfRepository shelfRepository;
    private final LibraryService libraryService;
    private final BookRepository bookRepository;

    @Autowired
    public ShelfService(ShelfRepository shelfRepository, LibraryService libraryService, BookRepository bookRepository) {
        this.shelfRepository = shelfRepository;
        this.libraryService = libraryService;
        this.bookRepository = bookRepository;
    }

    public Shelf prepareShelf(ShelfForm shelfForm, HttpServletRequest request, Long shelfId, boolean isDefault) {
        Shelf shelf = new Shelf(shelfId);
        shelf.setName(shelfForm.getName());

        Library library = libraryService.getUserLibrary(request);

        shelf.setLibrary(library);
        shelf.setDefault(isDefault);

        return shelf;
    }

    public Shelf addShelf(ShelfForm shelfForm, HttpServletRequest request, boolean isDefault) {
        return shelfRepository.save(prepareShelf(shelfForm, request, null, isDefault));
    }

    public ShelfData addShelf(ShelfForm shelfForm, HttpServletRequest request) {
        Shelf shelf = addShelf(shelfForm, request, false);
        return new ShelfData(shelfRepository.save(shelf));
    }

    public Set<ShelfData> getAllShelves(Set<Shelf> shelves) {
        Set<ShelfData> shelvesData = new HashSet<>();

        for(final Shelf shelf : shelves) {
            ShelfData shelfData = new ShelfData(shelf);
            shelfData.setId(shelf.getId());
            shelfData.setName(shelf.getName());
            shelfData.setBooksCount((long) shelf.getBooks().size());
            shelfData.setDefault(shelf.isDefault());

            List<Book> books = bookRepository.findAllByBookShelves(shelf, PageRequest.of(0, 4, Sort.by("id").descending()));
            Set<BookData> booksData = new HashSet<>();

            books.forEach(b -> booksData.add(new BookData(b)));

            shelfData.setBooks(booksData);

            shelvesData.add(shelfData);
        }

        return shelvesData;
    }

    public Set<ShelfData> getAllShelves(HttpServletRequest request) {
        Library library = libraryService.getUserLibrary(request);
        Set<Shelf> shelves = shelfRepository.findByLibrary(library);
        return getAllShelves(shelves);
    }

    public Set<ShelfData> getAllShelves(Library library) {
        Set<Shelf> shelves = shelfRepository.findByLibrary(library);
        return getAllShelves(shelves);
    }

    public void deleteShelf(Long id, HttpServletRequest request) {
        if(!shelfRepository.existsById(id)) {
            throw new MethodNotAllowedException("You do not have access to this resource.");
        }

        Library library = libraryService.getUserLibrary(request);
        Set<Shelf> shelves = shelfRepository.findByLibrary(library);
        Optional<Shelf> shelf = shelves.stream().filter(s -> s.getId() == id).findFirst();

        if(shelf.isEmpty()) {
            throw new MethodNotAllowedException("You do not have access to this resource.");
        }

        Shelf shelfToDelete = shelf.get();
        boolean canContinue = true;
        int pageNumber = 0;

        while(canContinue) {
            List<Book> shelfBooks = bookRepository.findAllByBookShelves(shelfToDelete, PageRequest.of(pageNumber, 100));

            if((long) shelfBooks.size() > 0) {
                shelfBooks.forEach(b -> {
                    Set<Shelf> bookShelves = b.getBookShelves();
                    b.setBookShelves(bookShelves.stream()
                            .filter(s -> s.getId() != id)
                            .collect(Collectors.toSet()));
                });

                bookRepository.saveAll(shelfBooks);
                pageNumber++;
            } else {
                canContinue = false;
            }
        }

        shelfRepository.delete(shelfToDelete);
    }

    public ShelfData editShelf(ShelfEditForm shelfEditForm, HttpServletRequest request) {
        Shelf shelf = prepareShelf(shelfEditForm, request, shelfEditForm.getId(), false);
        return new ShelfData(shelfRepository.save(shelf));
    }

    public Set<BookData> getShelfBooks(Long id, Integer page) {
        Shelf shelf = getShelf(id);
        List<Book> books = bookRepository.findAllByBookShelves(shelf, PageRequest.of(page, 12, Sort.by("id").descending()));

        return books.stream().map(BookData::new).collect(Collectors.toSet());
    }

    private Shelf getShelf(Long id) {
        Optional<Shelf> optionalShelf = shelfRepository.findById(id);

        if(optionalShelf.isEmpty()) {
            throw new MethodNotAllowedException("You do not have access to this resource.");
        }

        return optionalShelf.get();
    }

    public ShelfData getShelfData(Long id) {
        Shelf shelf = getShelf(id);
        return new ShelfData(shelf);
    }
}
