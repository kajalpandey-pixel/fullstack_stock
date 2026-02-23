package com.example.demo.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "stocks")
public class Stock {
    @Id
    private String id;
    private String name;
    private Double price;
    private Boolean isWatchListed;

    // Manually adding the Setters that StockSeeder is looking for
    public void setId(String id) { this.id = id; }
    public void setName(String name) { this.name = name; }
    public void setPrice(Double price) { this.price = price; }
    public void setIsWatchListed(Boolean isWatchListed) { this.isWatchListed = isWatchListed; }

    // Adding Getters so the API can actually return data
    public String getId() { return id; }
    public String getName() { return name; }
    public Double getPrice() { return price; }
    public Boolean getIsWatchListed() { return isWatchListed; }
}