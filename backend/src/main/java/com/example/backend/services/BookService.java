package com.example.backend.services;

import com.example.backend.data.ISBNBookData;
import com.example.backend.exceptions.InternalServerException;
import com.example.backend.forms.BookAddForm;
import com.example.backend.forms.ShelfForm;
import com.example.backend.models.Book;
import com.example.backend.models.Library;
import com.example.backend.models.Shelf;
import com.example.backend.models.User;
import com.example.backend.repositories.BookRepository;
import com.example.backend.repositories.LibraryRepository;
import com.example.backend.repositories.UserRepository;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.HashSet;
import java.util.List;
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

    @Autowired
    public BookService(BookRepository bookRepository, UserRepository userRepository, ShelfService shelfService, UserService userService, LibraryService libraryService, LibraryRepository libraryRepository) {
        this.bookRepository = bookRepository;
        this.userRepository = userRepository;
        this.shelfService = shelfService;
        this.userService = userService;
        this.libraryService = libraryService;
        this.libraryRepository = libraryRepository;
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

    public Book addBook(BookAddForm bookAddForm, HttpServletRequest request) {
        Book book = new Book();
        book.setName(bookAddForm.getName());
        book.setAuthor(bookAddForm.getAuthor());
        book.setISBN(bookAddForm.getISBN());
        book.setImageUrl(bookAddForm.getImageUrl());

        User user = userService.getUser(request);
        List<Shelf> userShelves = shelfService.getUserShelves(user.getId());

        Set<Shelf> bookShelves = new HashSet<>();

        Library library = libraryService.getUserLibrary(request);

        if(userShelves.stream().noneMatch(Shelf::isDefault)) {
            ShelfForm shelfForm = new ShelfForm("All books");

            Shelf shelf = shelfService.createShelf(shelfForm, request, true);
            userShelves.add(shelf);

            library.setShelves(userShelves);
            bookShelves.add(shelf);
        }

        bookShelves.addAll(userShelves.stream().filter(s -> bookAddForm.getShelves().contains(s.getId())).collect(Collectors.toSet()));

        book.setBookShelves(bookShelves);

        libraryRepository.save(library);
        return bookRepository.save(book);
    }
}
