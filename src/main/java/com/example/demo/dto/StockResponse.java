package com.example.demo.dto;

import com.example.demo.entity.Stock;
import java.util.List;

public class StockResponse {
    private List<Stock> data;
    private long totalCount;

    // Constructor
    public StockResponse(List<Stock> data, long totalCount) {
        this.data = data;
        this.totalCount = totalCount;
    }

    // Getters (Essential for Spring to "see" the data and send it to Redux)
    public List<Stock> getData() {
        return data;
    }

    public long getTotalCount() {
        return totalCount;
    }

    // Setters (Optional, but good practice)
    public void setData(List<Stock> data) {
        this.data = data;
    }

    public void setTotalCount(long totalCount) {
        this.totalCount = totalCount;
    }
}