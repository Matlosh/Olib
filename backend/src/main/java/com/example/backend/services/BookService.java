package com.example.backend.services;

import com.example.backend.data.BookData;
import com.example.backend.data.CoverUploadData;
import com.example.backend.data.ISBNBookData;
import com.example.backend.data.ShelfData;
import com.example.backend.exceptions.BadRequestException;
import com.example.backend.exceptions.InternalServerException;
import com.example.backend.exceptions.MethodNotAllowedException;
import com.example.backend.exceptions.NotFoundException;
import com.example.backend.forms.BookAddForm;
import com.example.backend.forms.BookAttachForm;
import com.example.backend.forms.BookEditForm;
import com.example.backend.forms.ShelfForm;
import com.example.backend.models.Book;
import com.example.backend.models.Library;
import com.example.backend.models.Shelf;
import com.example.backend.models.User;
import com.example.backend.repositories.BookRepository;
import com.example.backend.repositories.LibraryRepository;
import com.example.backend.repositories.ShelfRepository;
import com.example.backend.repositories.UserRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.file.Path;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class BookService {

    private final BookRepository bookRepository;
    private final UserRepository userRepository;
    private final ShelfService shelfService;
    private final UserService userService;
    private final LibraryService libraryService;
    private final LibraryRepository libraryRepository;
    private final ShelfRepository shelfRepository;
    private final FileSystemStorageService storageService;

    @Autowired
    public BookService(BookRepository bookRepository, UserRepository userRepository, ShelfService shelfService, UserService userService, LibraryService libraryService, LibraryRepository libraryRepository, ShelfRepository shelfRepository, FileSystemStorageService storageService) {
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
        this.shelfService = shelfService;
        this.userService = userService;
        this.libraryService = libraryService;
        this.libraryRepository = libraryRepository;
        this.shelfRepository = shelfRepository;
        this.storageService = storageService;
    }

    public ISBNBookData getBookDataByISBN(String isbn) {
        String bibKey = "ISBN:" + isbn;
        String apiUrl = "https://openlibrary.org/api/books?format=json&jscmd=data&bibkeys=" + bibKey;

        ISBNBookData bookData = new ISBNBookData("", "", isbn);

        try {
            URL url = new URL(apiUrl);

            ObjectMapper mapper = new ObjectMapper();
            JsonNode treeNode = mapper.readTree(url);

            if(treeNode.has(bibKey)) {
                bookData.setName(treeNode.get(bibKey).get("title").asText());

                StringBuilder authors = new StringBuilder();

                JsonNode arrNode = treeNode.get(bibKey).get("authors");
                if (arrNode.isArray()) {
                    for (final JsonNode node : arrNode) {
                        authors.append(node.get("name").asText());
                    }
                }

                bookData.setAuthor(authors.toString());

                if(treeNode.get(bibKey).has("cover") && treeNode.get(bibKey).get("cover").has("medium")) {
                    bookData.setImageUrl(treeNode.get(bibKey).get("cover").get("medium").asText());
                }
            }
        } catch(IOException ex) {
            throw new InternalServerException("There was an error while fetching the book info by ISBN.");
        }

        return bookData;
    }

    // saveLibrary saves new default shelf in case default shelf doesn't exist
    // bookId should be set in case of preparing book that's meant to be updated
    public Book prepareBook(BookAddForm bookAddForm, HttpServletRequest request, Long bookId, Boolean saveLibrary) {
        Book book = new Book(bookId);

        book.setName(bookAddForm.getName());
        book.setAuthor(bookAddForm.getAuthor());
        book.setISBN(bookAddForm.getISBN());
        book.setImageUrl(bookAddForm.getImageUrl());
        book.setScore(bookAddForm.getScore());
        book.setScored(bookAddForm.isScored());

        User user = userService.getUser(request);
        Library library = libraryRepository.findOneByUser(user);

        Set<Shelf> userShelves = shelfRepository.findByLibrary(library);

        Set<Shelf> bookShelves = new HashSet<>();
        Shelf defaultShelf = userShelves.stream().filter(Shelf::isDefault).findFirst().orElse(null);

        if(defaultShelf == null) {
            ShelfForm shelfForm = new ShelfForm("All books");

            Shelf shelf = shelfService.addShelf(shelfForm, request, true);
            userShelves.add(shelf);

            library.setShelves(userShelves);
            bookShelves.add(shelf);
        }

        bookShelves.add(defaultShelf);

        bookShelves.addAll(userShelves.stream()
                .filter(s -> bookAddForm.getShelves().contains(s.getId()))
                .collect(Collectors.toSet()));

        book.setBookShelves(bookShelves);

        if(saveLibrary != null && saveLibrary) {
            libraryRepository.save(library);
        }

        return book;
    }

    public BookData addBook(BookAddForm bookAddForm, HttpServletRequest request) {
        Book book = prepareBook(bookAddForm, request, null, true);
        return new BookData(bookRepository.save(book));
    }

    public BookData editBook(BookEditForm bookEditForm, HttpServletRequest request) {
        if(!bookRepository.existsById(bookEditForm.getId())) {
            throw new MethodNotAllowedException("You do not have access to this resource.");
        }

        Book book = prepareBook(bookEditForm, request, bookEditForm.getId(), true);
        return new BookData(bookRepository.save(book));
    }

    // Validates if book exists and user has access to it, and returns it
    public Book getUserBook(Long id, HttpServletRequest request) {
        Optional<Book> optionalBook = bookRepository.findById(id);

        if(optionalBook.isEmpty()) {
            throw new MethodNotAllowedException("You do not have access to this resource.");
        }

        Library library = libraryService.getUserLibrary(request);
        Shelf defaultShelf = shelfRepository.findByIsDefaultTrueAndLibrary(library);

        Book book = optionalBook.get();
        if(!book.getBookShelves().contains(defaultShelf)) {
            throw new MethodNotAllowedException("You do not have access to this resource.");
        }

        return book;
    }

    public void deleteBook(Long id, HttpServletRequest request) {
        bookRepository.delete(getUserBook(id, request));
    }

    public void addBookToShelves(BookAttachForm bookAttachForm, HttpServletRequest request) {
        Book book = getUserBook(bookAttachForm.getBookId(), request);

        Library library = libraryService.getUserLibrary(request);
        Set<Shelf> userShelves = shelfRepository.findByLibrary(library);

        Set<Shelf> shelvesToAdd = userShelves.stream()
                .filter(s -> bookAttachForm.getShelves().contains(s.getId()))
                .collect(Collectors.toSet());

        if(shelvesToAdd.isEmpty()) {
            throw new BadRequestException("You did not provide any correct shelves to add the book.");
        }

        Set<Shelf> bookShelves = book.getBookShelves();
        bookShelves.addAll(shelvesToAdd);
        book.setBookShelves(bookShelves);
    }

    public void removeBookFromShelves(BookAttachForm bookDetachForm, HttpServletRequest request) {
        Book book = getUserBook(bookDetachForm.getBookId(), request);

        Library library = libraryService.getUserLibrary(request);
        Set<Shelf> userShelves = shelfRepository.findByLibrary(library);

        Set<Shelf> shelvesToRemove = userShelves.stream()
                .filter(s -> bookDetachForm.getShelves().contains(s.getId()))
                .collect(Collectors.toSet());

        if(shelvesToRemove.isEmpty()) {
            throw new BadRequestException("You did not provide any correct shelves to remove the book from.");
        }

        Set<Shelf> bookShelves = book.getBookShelves().stream()
                .filter(s -> !bookDetachForm.getShelves().contains(s.getId()))
                .collect(Collectors.toSet());
        book.setBookShelves(bookShelves);
    }

    public CoverUploadData uploadCover(MultipartFile file, Long id, HttpServletRequest request) {
        Book book = getUserBook(id, request);

        Path path = storageService.load(storageService.store(file).getFileName().toString());

        if(!book.getImageUrl().trim().isEmpty()) {
            try {
                deleteCover(book.getId(), request);
            } catch(MethodNotAllowedException ignored) {}
        }

        book.setImageUrl(path.toString());

        bookRepository.save(book);

        CoverUploadData coverUploadData = new CoverUploadData();
        coverUploadData.setImageUrl(path.toString());

        return coverUploadData;
    }

    public void deleteCover(Long id, HttpServletRequest request) {
        Book book = getUserBook(id, request);

        if(book.getImageUrl().trim().isEmpty()) {
            throw new MethodNotAllowedException("This book doesn't have a cover.");
        }

        storageService.deleteResource(storageService.unload(book.getImageUrl()));

        book.setImageUrl("");
        bookRepository.save(book);
    }

    public Set<ShelfData> getBookShelves(Long id, HttpServletRequest request) {
        Optional<Book> optionalBook = bookRepository.findById(id);

        if(optionalBook.isEmpty()) {
            throw new MethodNotAllowedException("You do not have access to this resource.");
        }

        Set<Shelf> shelves = shelfRepository.findAllByBooks(optionalBook.get());
        return shelves.stream().map(ShelfData::new).collect(Collectors.toSet());
    }

    public Set<BookData> searchBooks(String name, Integer limit, HttpServletRequest request) {
        if(name.trim().isEmpty()) {
            throw new BadRequestException("Name cannot be empty.");
        }

        if(limit < 1) {
            throw new BadRequestException("Limit cannot be smaller than 1.");
        }

        List<Book> books = bookRepository.findAllByNameContainingIgnoreCase(name, PageRequest.of(0, limit, Sort.by("id").descending()));
        return books.stream().map(BookData::new).collect(Collectors.toSet());
    }
}