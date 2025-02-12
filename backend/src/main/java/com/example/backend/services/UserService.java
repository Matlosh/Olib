package com.example.backend.services;

import com.example.backend.data.UserData;
import com.example.backend.exceptions.BadRequestException;
import com.example.backend.exceptions.ForbiddenException;
import com.example.backend.forms.LoginForm;
import com.example.backend.forms.RegisterForm;
import com.example.backend.models.Library;
import com.example.backend.models.User;
import com.example.backend.repositories.LibraryRepository;
import com.example.backend.repositories.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final LibraryRepository libraryRepository;

    @Autowired
    public UserService(UserRepository userRepository, LibraryRepository libraryRepository) {
        this.userRepository = userRepository;
        this.libraryRepository = libraryRepository;
    }

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<User> getAll() {
        return userRepository.findAll();
    }

    private void authenticate(HttpServletRequest request) {
        boolean authenticated;
        Object email = request.getSession().getAttribute("email");

        if(email == null) {
            authenticated = false;
        } else {
            Optional<User> user = userRepository.findOneByEmail((String) email);
            authenticated = user.isPresent();
        }

        if(!authenticated) {
            throw new ForbiddenException("You must be logged in to access this resource.");
        }
    }

    private boolean emailExists(String email) {
        return userRepository.findOneByEmail(email).isPresent();
    }

    private boolean nickExists(String nick) {
        return userRepository.findOneByNick(nick).isPresent();
    }

    private boolean loginExists(String login) {
        return userRepository.findOneByLogin(login).isPresent();
    }

    public void registerUser(RegisterForm form) {
        if(emailExists(form.getEmail())) {
            throw new BadRequestException("Email already exists.");
        } else if(nickExists(form.getNick())) {
            throw new BadRequestException("Nick already exists.");
        } else if(loginExists(form.getLogin())) {
            throw new BadRequestException("Login already exists.");
        }

        User user = new User();
        user.setEmail(form.getEmail());
        user.setNick(form.getNick());
        user.setLogin(form.getLogin());

        user.setPassword(passwordEncoder.encode(form.getPassword()));

        Library library = new Library(user);

        userRepository.save(user);
        libraryRepository.save(library);
    }

    public void loginUser(LoginForm form, HttpServletRequest request) {
        if(request.getSession().getAttribute("email") != null) {
            throw new BadRequestException("Already logged in.");
        }

        Optional<User> user = userRepository.findOneByLogin(form.getLogin());
        if(user.isEmpty() || !passwordEncoder.matches(form.getPassword(), user.get().getPassword())) {
            throw new BadRequestException("Wrong login or password.");
        }

        request.getSession().setAttribute("email", user.get().getEmail());
    }

    public void logoutUser(HttpServletRequest request) {
        request.getSession().removeAttribute("email");
    }

    public UserData getMe(HttpServletRequest request) {
        authenticate(request);

        Object email = request.getSession().getAttribute("email");
        Optional<User> user = userRepository.findOneByEmail(String.valueOf(email));

        if(user.isEmpty()) {
            throw new BadRequestException("User doesn't exist.");
        }

        UserData userData = new UserData();
        userData.setNick(user.get().getNick());

        return userData;
    }
}
