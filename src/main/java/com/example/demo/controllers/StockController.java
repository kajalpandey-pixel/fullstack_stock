package com.example.demo.controller;

import com.example.demo.entity.Stock;
import com.example.demo.entity.User;
import com.example.demo.dto.StockResponse;
import com.example.demo.repository.StockRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/stocks")
@CrossOrigin(origins = "http://localhost:5173")
public class StockController {

    @Autowired
    private StockRepository stockRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public StockResponse getStocks(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int limit,
            @RequestParam(defaultValue = "guest") String username,
            @RequestParam(defaultValue = "false") boolean watchlistOnly) {

        //  if user already exists , it will check it in database
        User user = userRepository.findByUsername(username).orElseGet(() -> {
            User newUser = new User();
            newUser.setUsername(username);
            return userRepository.save(newUser);
        });

        List<Stock> stockList;
        long totalElements;

        if (watchlistOnly) {
            stockList = new ArrayList<>(user.getWatchlist());
            totalElements = stockList.size();
            stockList.forEach(s -> s.setIsWatchListed(true));
        } else {
            Page<Stock> stockPage = stockRepository.findAll(PageRequest.of(page - 1, limit));
            stockList = stockPage.getContent();
            totalElements = stockPage.getTotalElements();

            stockList.forEach(stock -> {
                boolean isSaved = user.getWatchlist().stream()
                        .anyMatch(savedStock -> savedStock.getId().equals(stock.getId()));
                stock.setIsWatchListed(isSaved);
            });
        }

        return new StockResponse(stockList, totalElements);
    }
}