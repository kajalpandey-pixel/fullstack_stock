import { useDispatch } from "react-redux";
import { setPage, type Stock } from "../redux/slices/StockSlice";
import { type AppDispatch } from "../redux/store";
import '../styles/table.scss'

interface TableProps {
  stocks: Stock[];
  loading: boolean;
  onToggle: (id: string) => void;
  currentPage: number;
  totalCount: number;
  pageSize: number;
}

export const Table = ({ stocks, loading, onToggle, currentPage, totalCount, pageSize }: TableProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <>
      <div className="pagination">
        <button disabled={currentPage === 1 || loading} onClick={() => dispatch(setPage(currentPage - 1))}> &larr; Prev </button>
        <span> Page {currentPage} of {totalPages || 1} </span>
        <button disabled={currentPage >= totalPages || loading} onClick={() => dispatch(setPage(currentPage + 1))}> Next &rarr; </button>
      </div>

      <table border={1}>
        <thead>
          <tr>
            <th >Name</th>
            <th>Price</th>
            <th>Watchlist</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr><td colSpan={3}>Loading market data...</td></tr>
          ) : stocks.length === 0 ? (
            <tr><td colSpan={3} >No stocks available.</td></tr>
          ) : stocks.map((stock) => (
            <tr key={stock.id}>
              <td>{stock.name}</td>
              <td>${stock.price.toFixed(2)}</td>
              <td>
                <button 
                  onClick={() => onToggle(stock.id)}
            
                >
                  {stock.isWatchListed ? "✔" : "+"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};