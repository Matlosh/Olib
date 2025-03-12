package com.example.backend.data;

public class ScoreData {
    private Integer score;
    private Integer count;

    public ScoreData(Integer count, Integer score) {
        this.count = count;
        this.score = score;
    }

    public Integer getScore() {
        return score;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public Integer getCount() {
        return count;
    }

    public void setCount(Integer count) {
        this.count = count;
    }
}
