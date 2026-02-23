import { useState, useEffect } from "react";
import { Table } from "./Table";
import { useDispatch, useSelector } from "react-redux";
import { type RootState, type AppDispatch } from "../redux/store";
import { fetchStocks, toggleWatchlist } from "../redux/slices/StockSlice";
import '../styles/dashboard.scss'

export const Dashboard = ({username } : {username :string}) => {
  const [tabSelected, setTabSelected] = useState<"Explore" | "WatchList">("Explore");
  const dispatch = useDispatch<AppDispatch>();

  const { items, pagination, loading } = useSelector((state: RootState) => state.stocks);

  const loadData = () => {
    dispatch(fetchStocks({
      page: pagination.currentPage,
      pageSize: pagination.pageSize,
      username :username , 
      isWatchlistOnly: tabSelected === "WatchList"
    }));
  };

  useEffect(() => {
    loadData();
  }, [tabSelected, pagination.currentPage , username]);

  const handleToggle = async (stockId: string) => {
    await dispatch(toggleWatchlist({username , stockId}));
    if (tabSelected === "WatchList") {
      loadData();
    }
  };

  return (
    <div>
      
      <p>User : <strong>{username}</strong></p>

      <nav>
        <button onClick={() => setTabSelected("Explore")} >
          Explore
        </button>
        <button onClick={() => setTabSelected("WatchList")} >
          Watchlist
        </button>
      </nav>

      <Table 
        stocks={items} 
        loading={loading}
        onToggle={handleToggle}
        currentPage={pagination.currentPage}
        totalCount={pagination.totalCount}
        pageSize={pagination.pageSize}
      />
    </div>
  );
};

