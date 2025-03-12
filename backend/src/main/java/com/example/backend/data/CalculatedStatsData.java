package com.example.backend.data;

public class CalculatedStatsData {
    private Long booksCount;
    private Long shelvesCount;
    private Double averageScore;

    public CalculatedStatsData(Long booksCount, Long shelvesCount, Double averageScore) {
        this.booksCount = booksCount;
        this.shelvesCount = shelvesCount;
        this.averageScore = averageScore;
    }

    public Long getBooksCount() {
        return booksCount;
    }

    public void setBooksCount(Long booksCount) {
        this.booksCount = booksCount;
    }

    public Long getShelvesCount() {
        return shelvesCount;
    }

    public void setShelvesCount(Long shelvesCount) {
        this.shelvesCount = shelvesCount;
    }

    public Double getAverageScore() {
        return averageScore;
    }

    public void setAverageScore(Double averageScore) {
        this.averageScore = averageScore;
    }
}
