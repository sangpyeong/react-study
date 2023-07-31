import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import axios from "axios";

interface Stock {
  id: number;
  stockName: string;
  currentPrice: number;
  marketCapitalization: number;
  tradingVolume: number;
}

interface StockItemProps {
  stock: Stock;
  isChecked: boolean;
  onToggleCheckbox: (id: number) => void;
}

const StockItem = ({ stock, isChecked, onToggleCheckbox }: StockItemProps) => {
  return (
    <li key={stock.id} className="border p-2">
      <div className="flex items-center">
        <NavLink
          to={`/stock/${stock.id}`}
          className="flex justify-between w-4/5 pr-4"
        >
          <div className="w-1/5">{stock.id}</div>
          <div className="w-1/5">{stock.stockName}</div>
          <div className="w-1/5">{stock.currentPrice}</div>
          <div className="w-1/5">{stock.marketCapitalization}</div>
          <div className="w-1/5">{stock.tradingVolume}</div>
        </NavLink>
        <input
          type="checkbox"
          value={stock.id}
          checked={isChecked}
          onChange={(e) => onToggleCheckbox(stock.id)}
        />
      </div>
    </li>
  );
};

export default function MainPage() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [deleteStock, setDeleteStock] = useState<number[]>([]);
  useEffect(() => {
    axios
      .get<Stock[]>("http://localhost:8080/stocks")
      .then((res) => {
        console.log(res.data);
        setStocks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const navigate = useNavigate();

  const handleCreateButton = () => {
    navigate("/stock/add");
  };

  const handleToggleCheckbox = (id: number) => {
    if (deleteStock.includes(id)) {
      setDeleteStock((prevDeleteStock) =>
        prevDeleteStock.filter((deleteId) => deleteId !== id)
      );
    } else {
      setDeleteStock([...deleteStock, id]);
    }
  };

  const handleDeleteButton = () => {
    console.log(deleteStock);
    axios
      .post("http://localhost:8080/stocks/delete", deleteStock)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get<Stock[]>("http://localhost:8080/stocks")
      .then((res) => {
        console.log(res.data);
        setStocks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    navigate("/stocks");
  };

  return (
    <div className="flex flex-col h-[80vh] w-[100%] items-center">
      <h1>주식 리스트</h1>
      <ul className="w-3/4">
        {stocks.map((stock) => (
          <StockItem
            key={stock.id}
            stock={stock}
            isChecked={deleteStock.includes(stock.id)}
            onToggleCheckbox={handleToggleCheckbox}
          />
        ))}
      </ul>
      <div className="flex justify-between w-3/4">
        <Button onClick={handleCreateButton}>추가</Button>
        <Button onClick={handleDeleteButton}>삭제</Button>
      </div>
    </div>
  );
}
