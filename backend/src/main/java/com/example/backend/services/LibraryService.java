package com.example.backend.services;

import com.example.backend.models.Library;
import com.example.backend.models.User;
import com.example.backend.repositories.LibraryRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
