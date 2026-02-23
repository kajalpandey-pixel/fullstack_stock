import { createAsyncThunk } from "@reduxjs/toolkit";



export const toggleWatchlist = createAsyncThunk(
  'stocks/toggleWatchlist',
  async ({ userId, stockId }: { userId: number, stockId: string }) => {
    const response = await fetch(`http://localhost:8080/api/users/${userId}/watchlist/${stockId}`, {
      method: 'POST'
    });
    return response.json(); 
    // this returns updated watchlist or success status
  }
);