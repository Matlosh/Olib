package com.example.backend.services;

import com.example.backend.data.CalculatedStatsData;
import com.example.backend.data.ScoreData;
import com.example.backend.data.StatsData;
import com.example.backend.data.UserData;
import com.example.backend.exceptions.BadRequestException;
import com.example.backend.exceptions.ForbiddenException;
import com.example.backend.forms.LoginForm;
import com.example.backend.forms.RegisterForm;
import com.example.backend.forms.ShelfForm;
import com.example.backend.models.Library;
import com.example.backend.models.Shelf;
import com.example.backend.models.User;
import com.example.backend.repositories.LibraryRepository;
import com.example.backend.repositories.UserRepository;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final LibraryRepository libraryRepository;
    private final ShelfService shelfService;

    @Autowired
    public UserService(UserRepository userRepository, LibraryRepository libraryRepository, @Lazy ShelfService shelfService, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.libraryRepository = libraryRepository;
        this.shelfService = shelfService;
        this.passwordEncoder = passwordEncoder;
    }

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<User> getAll() {
        return userRepository.findAll();
    }

    public void authenticate(HttpServletRequest request) {
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

        shelfService.addDefaultShelf("All books", library);

        // Shelf defaultShelf =
//        Set<Shelf> shelves = new HashSet<>();
//        shelves.add(defaultShelf);

        // library.setShelves(shelves);
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
        Object email = request.getSession().getAttribute("email");
        Optional<User> user = userRepository.findOneByEmail(String.valueOf(email));

        if(user.isEmpty()) {
            throw new BadRequestException("User doesn't exist.");
        }

        UserData userData = new UserData();
        userData.setNick(user.get().getNick());

        return userData;
    }

    public User getUser(HttpServletRequest request) {
        Object email = request.getSession().getAttribute("email");
        Optional<User> user = userRepository.findOneByEmail(String.valueOf(email));

        if(user.isEmpty()) {
            throw new BadRequestException("User doesn't exist.");
        }

        return user.get();
    }

    public StatsData getUserStats(HttpServletRequest request) {
        User user = getUser(request);
        return getUserStats(user.getId());
    }

    public StatsData getUserStats(Long userId) {
        CalculatedStatsData calculatedStatsData = userRepository.findStats(userId);
        List<ScoreData> scoreDataList = userRepository.findAllScores(userId);

        StatsData statsData = new StatsData(calculatedStatsData);
        statsData.setScores(scoreDataList);

        return statsData;
    }
}
