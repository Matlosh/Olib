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

    @Query(value = "select u.* from users u inner join libraries l on l.user_id = u.id where l.id = :libraryId",
        nativeQuery = true)
    Optional<User> findOneByLibraryId(@Param("libraryId") Long libraryId);

    @Query(value = """
            SELECT (
            SELECT COUNT(*) FROM (SELECT sb.book_id FROM libraries l INNER JOIN shelves s ON s.library_id = l.id INNER JOIN shelves_books sb ON sb.shelf_id = s.id WHERE l.user_id = :userId GROUP BY sb.book_id)
            ) AS books_count,
            (
            SELECT COUNT(*) FROM (SELECT s.id FROM libraries l INNER JOIN shelves s ON s.library_id = l.id WHERE l.user_id = 1)
            ) AS shelves_count,
            (
            SELECT CAST(AVG(b.score) AS DOUBLE PRECISION) FROM libraries l INNER JOIN shelves s ON s.library_id = l.id INNER JOIN shelves_books sb ON sb.shelf_id = s.id INNER JOIN books b ON b.id = sb.book_id WHERE l.user_id = :userId AND b.is_scored = true AND sb.shelf_id = (SELECT s.id FROM shelves s INNER JOIN libraries l ON l.id = s.library_id WHERE l.user_id = :userId AND is_default = true)
            ) AS average_score
            ;""",
        nativeQuery = true)
    CalculatedStatsData findStats(@Param("userId") Long userId);

    @Query(value = "SELECT CAST(COUNT(b.score) AS INTEGER), CAST(b.score AS INTEGER) FROM libraries l INNER JOIN shelves s ON s.library_id = l.id INNER JOIN shelves_books sb ON sb.shelf_id = s.id INNER JOIN books b ON b.id = sb.book_id WHERE l.user_id = :userId AND b.is_scored = true AND sb.shelf_id = (SELECT s.id FROM shelves s INNER JOIN libraries l ON l.id = s.library_id WHERE l.user_id = :userId AND is_default = true) GROUP BY b.score;",
        nativeQuery = true)
    List<ScoreData> findAllScores(@Param("userId") Long userId);

}
