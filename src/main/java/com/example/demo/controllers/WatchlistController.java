package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.entity.Stock;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.StockRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/watchlist")
@CrossOrigin(origins = "http://localhost:5173")
public class WatchlistController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StockRepository stockRepository;

    @PostMapping("/toggle")
    public String toggleWatchlist(@RequestBody Map<String, String> payload) {
        String username = payload.get("username");
        String stockId = payload.get("stockId");

        User user = userRepository.findByUsername(username).orElseGet(() -> {
            User newUser = new User();
            newUser.setUsername(username);
            return userRepository.save(newUser);
        });

        Stock stock = stockRepository.findById(stockId)
                .orElseThrow(() -> new RuntimeException("Stock not found"));

        boolean removed = user.getWatchlist().removeIf(s -> s.getId().equals(stockId));

        if (!removed) {
            user.getWatchlist().add(stock);
            userRepository.save(user);
            return "ADDED";
        }

        userRepository.save(user);
        return "REMOVED";
    }
}