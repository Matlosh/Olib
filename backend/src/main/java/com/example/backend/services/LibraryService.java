package com.example.backend.services;

import com.example.backend.data.LibraryData;
import com.example.backend.data.PublicLibraryData;
import com.example.backend.data.StatsData;
import com.example.backend.exceptions.ForbiddenException;
import com.example.backend.exceptions.MethodNotAllowedException;
import com.example.backend.exceptions.NotFoundException;
import com.example.backend.forms.LibraryForm;
import com.example.backend.models.Library;
import com.example.backend.models.Shelf;
import com.example.backend.models.User;
import com.example.backend.repositories.LibraryRepository;
import com.example.backend.repositories.ShelfRepository;
import com.example.backend.repositories.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.Set;

@Service
public class LibraryService {

    private final LibraryRepository libraryRepository;
    private final UserService userService;
    private final UserRepository userRepository;
    private final ShelfService shelfService;

    @Autowired
    public LibraryService(LibraryRepository libraryRepository, UserService userService, UserRepository userRepository, @Lazy ShelfService shelfService) {
        this.libraryRepository = libraryRepository;
        this.userService = userService;
        this.userRepository = userRepository;
        this.shelfService = shelfService;
    }

    public Library getUserLibrary(HttpServletRequest request) {
        User user = userService.getUser(request);
        return libraryRepository.findOneByUser(user);
    }

    // Verifies if library is public and throws error if no
    public void verifyLibraryPublic(Long id) {
        Optional<Library> optionalLibrary = libraryRepository.findById(id);

        if(optionalLibrary.isEmpty()) {
            throw new NotFoundException("Resource not found.");
        }

        Library library = optionalLibrary.get();
        if(!library.isPublic()) {
            throw new ForbiddenException("You cannot access this resource.");
        }
    }

    public Library editLibrary(LibraryForm libraryForm, HttpServletRequest request) {
        Library library = getUserLibrary(request);
        library.setPublic(libraryForm.isPublic());
        return libraryRepository.save(library);
    }

    public LibraryData getUserLibraryData(HttpServletRequest request) {
        Library library = getUserLibrary(request);
        return new LibraryData(library);
    }

    public PublicLibraryData getPublicLibrary(Long libraryId) {
        Optional<User> optionalUser = userRepository.findOneByLibraryId(libraryId);
        Optional<Library> optionalLibrary = libraryRepository.findById(libraryId);

        if(optionalUser.isEmpty() || optionalLibrary.isEmpty()) {
            throw new MethodNotAllowedException("You do not have access to this resource.");
        }

        Library library = optionalLibrary.get();

        User user = optionalUser.get();
        PublicLibraryData publicLibraryData = new PublicLibraryData();
        publicLibraryData.setOwnerName(user.getNick());
        publicLibraryData.setShelves(shelfService.getAllShelves(library));

        return publicLibraryData;
    }

    public StatsData getLibraryStats(Long libraryId) {
        Optional<Library> optionalLibrary = libraryRepository.findById(libraryId);

        if(optionalLibrary.isEmpty()) {
            throw new MethodNotAllowedException("You do not have access to this resource.");
        }

        Library library = optionalLibrary.get();
        return userService.getUserStats(library.getUser().getId());
    }
}