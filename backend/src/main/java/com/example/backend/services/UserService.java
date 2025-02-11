package com.example.backend.services;

import com.example.backend.exceptions.EmailExistsException;
import com.example.backend.forms.LoginForm;
import com.example.backend.forms.RegisterForm;
import com.example.backend.models.User;
import com.example.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAll() {
        return userRepository.findAll();
    }

    private boolean emailExists(String email) {
        return userRepository.findOneByEmail(email).isPresent();
    }

    public User createUser(RegisterForm form) throws EmailExistsException {
        if(emailExists(form.getEmail())) {
            throw new EmailExistsException("Email already exists.");
        }

        User user = new User();
        user.setEmail(form.getEmail());
        user.setNick(form.getNick());
        user.setLogin(form.getLogin());

        user.setPassword(passwordEncoder.encode(form.getPassword()));

        return userRepository.save(user);
    }

    public void loginUser(LoginForm form) {
        Optional<User> user = userRepository.findOneByLogin(form.getLogin());
        if(user.isEmpty() || passwordEncoder.matches(form.getPassword(), user.get().getPassword())) {
            throw new RuntimeException("Wrong login or password.");
        }

        // Add cookies and similar
    }
}
