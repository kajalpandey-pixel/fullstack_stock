import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';

export interface Stock {
  id: string;
  name: string;
  price: number;
  isWatchListed: boolean;
}

interface FetchStocksResponse {
  data: Stock[];
  totalCount: number;
}

interface FetchStocksArgs {
  page: number;
  pageSize: number;
  isWatchlistOnly: boolean;
}

export const fetchStocks = createAsyncThunk<FetchStocksResponse, FetchStocksArgs>(
  'stocks/fetchStocks',
  async ({ page, pageSize, isWatchlistOnly }, { rejectWithValue }) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/stocks?page=${page}&limit=${pageSize}&username=guest&watchlistOnly=${isWatchlistOnly}`
      );
      if (!response.ok) throw new Error('Failed to fetch');
      return await response.json(); 
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleWatchlist = createAsyncThunk(
  'stocks/toggle',
  async (stockId: string, { rejectWithValue }) => {
    try {
      const response = await fetch('http://localhost:8080/api/watchlist/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: "guest", stockId })
      });
      
      if (!response.ok) throw new Error('Toggle failed');
      const status = await response.text();
      return { stockId, status }; 
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

interface StockState {
  items: Stock[];
  pagination: { currentPage: number; pageSize: number; totalCount: number; };
  loading: boolean;
  error: string | null;
}

const initialState: StockState = {
  items: [],
  pagination: { currentPage: 1, pageSize: 10, totalCount: 0 },
  loading: false,
  error: null,
};

const stockSlice = createSlice({
  name: 'stocks',
  initialState,
  reducers: {
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStocks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStocks.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.data; 
        state.pagination.totalCount = action.payload.totalCount;
      })
      .addCase(fetchStocks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(toggleWatchlist.fulfilled, (state, action) => {
        const { stockId, status } = action.payload;
        const stock = state.items.find(s => s.id === stockId);
        if (stock) {
          stock.isWatchListed = (status === "ADDED");
        }
      });
  },
});

export const { setPage } = stockSlice.actions;
export default stockSlice.reducer;