package com.example.backend.services;

import com.example.backend.data.LibraryData;
import com.example.backend.exceptions.ForbiddenException;
import com.example.backend.exceptions.NotFoundException;
import com.example.backend.forms.LibraryForm;
import com.example.backend.models.Library;
import com.example.backend.models.User;
import com.example.backend.repositories.LibraryRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LibraryService {

    private final LibraryRepository libraryRepository;
    private final UserService userService;

    @Autowired
    public LibraryService(LibraryRepository libraryRepository, UserService userService) {
        this.libraryRepository = libraryRepository;
        this.userService = userService;
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
}