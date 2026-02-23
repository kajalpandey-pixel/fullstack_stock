package com.example.demo.config;

import com.example.demo.entity.Stock;
import com.example.demo.repository.StockRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.util.UUID;


@Component
public class StockSeeder implements CommandLineRunner {

    private final StockRepository repository;

    public StockSeeder(StockRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) {
        if (repository.count() == 0) {
            for (int i = 1; i <= 50; i++) {
                Stock s = new Stock();
                s.setId(UUID.randomUUID().toString());
                s.setName("Stock " + i);
                s.setPrice(Math.random() * 1000);
                s.setIsWatchListed(false);
                repository.save(s);
            }
            System.out.println("Database Seeded!");
        }
    }
}

