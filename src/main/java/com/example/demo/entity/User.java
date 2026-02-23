package com.example.demo.entity;

import jakarta.persistence.*;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "user_watchlist",
            joinColumns = @JoinColumn(name = "user_id"),
            inverseJoinColumns = @JoinColumn(name = "stock_id")
    )
    private Set<Stock> watchlist = new HashSet<>();

    public User() {}

    // GETTERS AND SETTERS (Essential to prevent "Cannot find symbol")
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public Set<Stock> getWatchlist() { return watchlist; }
    public void setWatchlist(Set<Stock> watchlist) { this.watchlist = watchlist; }
}