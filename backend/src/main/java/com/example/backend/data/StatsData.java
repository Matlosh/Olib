package com.example.backend.data;

import java.util.List;

public class StatsData extends CalculatedStatsData {
    private List<ScoreData> scores;

    public StatsData(CalculatedStatsData calculatedStatsData) {
        super(calculatedStatsData.getBooksCount(),
                calculatedStatsData.getShelvesCount(),
                calculatedStatsData.getAverageScore());
    }

    public List<ScoreData> getScores() {
        return scores;
    }

    public void setScores(List<ScoreData> scores) {
        this.scores = scores;
    }
}
