import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import axios from "axios";

interface Stock {
  id: number;
  stockName: string;
  currentPrice: number;
  marketCapitalization: number;
  tradingVolume: number;
}

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

  return (
    <div className="flex flex-col h-[80vh] w-[100%]">
      <h1>주식 리스트</h1>
      <ul>
        {stocks.map((stock) => (
          <li key={stock.id}>
            <div className="flex">
              <NavLink
                to={`/stock/${stock.id}`}
                className="flex justify-center w-[80%] border"
              >
                <div className="w-[30%]">{stock.id}</div>
                <div className="w-[30%]">{stock.stockName}</div>
                <div className="w-[30%]">{stock.currentPrice}</div>
                <div className="w-[30%]">{stock.marketCapitalization}</div>
                <div className="w-[30%]">{stock.tradingVolume}</div>
              </NavLink>
              <input
                type="checkbox"
                value={stock.id}
                onChange={(e) => {
                  const { value, checked } = e.target;
                  if (checked) {
                    setDeleteStock([...deleteStock, Number(value)]);
                  } else {
                    setDeleteStock((prevDeleteStock) =>
                      prevDeleteStock.filter((id) => id !== Number(value))
                    );
                  }
                }}
              />
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-between">
        <Button onClick={handleCreateButton} className="w-[10%]">
          추가
        </Button>
        <Button
          onClick={() => {
            console.log(deleteStock);
            axios
              .post("http://localhost:8080/stock/delete", deleteStock)
              .then((res) => {
                console.log(res.data);
                navigate(`/stocks`);
              })
              .catch((err) => {
                console.log(err);
              });
          }}
          className="w-[10%]"
        >
          삭제
        </Button>
      </div>
    </div>
  );
}
