package com.example.backend.data;

public class UserData {
    private String nick;

    public UserData() {}

    public UserData(String nick) {
        this.nick = nick;
    }

    public String getNick() {
        return nick;
    }

    public void setNick(String nick) {
        this.nick = nick;
    }
}
