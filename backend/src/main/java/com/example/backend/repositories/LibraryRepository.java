package com.example.backend.repositories;

import com.example.backend.models.Library;
import com.example.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LibraryRepository extends JpaRepository<Library, Long> {

    Library findOneByUser(User user);

}
