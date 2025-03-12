package com.example.backend.repositories;

import com.example.backend.data.CalculatedStatsData;
import com.example.backend.data.ScoreData;
import com.example.backend.data.StatsData;
import com.example.backend.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findOneByEmail(String email);
    Optional<User> findOneByLogin(String login);
    Optional<User> findOneByNick(String nick);
    @Query(value = "SELECT (\n" +
            "SELECT COUNT(*) FROM (SELECT sb.book_id FROM libraries l INNER JOIN shelves s ON s.library_id = l.id INNER JOIN shelves_books sb ON sb.shelf_id = s.id WHERE l.id = 1 GROUP BY sb.book_id)\n" +
            ") AS books_count,\n" +
            "(\n" +
            "SELECT COUNT(*) FROM (SELECT sb.shelf_id FROM libraries l INNER JOIN shelves s ON s.library_id = l.id INNER JOIN shelves_books sb ON sb.shelf_id = s.id WHERE l.id = 1 GROUP BY sb.shelf_id)\n" +
            ") AS shelves_count,\n" +
            "(\n" +
            "SELECT CAST(AVG(b.score) AS DOUBLE PRECISION) FROM libraries l INNER JOIN shelves s ON s.library_id = l.id INNER JOIN shelves_books sb ON sb.shelf_id = s.id INNER JOIN books b ON b.id = sb.book_id WHERE l.id = :userId AND b.is_scored = true\n" +
            ") AS average_score\n" +
            ";",
        nativeQuery = true)
    CalculatedStatsData findStats(@Param("userId") Long userId);

    @Query(value = "SELECT CAST(COUNT(b.score) as INTEGER), CAST(b.score AS INTEGER) FROM libraries l INNER JOIN shelves s ON s.library_id = l.id INNER JOIN shelves_books sb ON sb.shelf_id = s.id INNER JOIN books b ON b.id = sb.book_id WHERE l.id = :userId AND b.is_scored = true GROUP BY b.score;",
        nativeQuery = true)
    List<ScoreData> findAllScores(@Param("userId") Long userId);

}
