import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../components/Button";

export default function MainPage() {
  //const [stocks, setStocks] = useState([]);
  //useEffect(() => {}, []);
  const navigate = useNavigate();
  const stocks = [
    {
      id: 1,
      stockName: "Apple Inc.",
      currentPrice: 148.56,
      marketCapitalization: 148.56,
      tradingVolume: 148.56,
    },
    {
      id: 2,
      stockName: "Alphabet Inc.",
      currentPrice: 2678.12,
      marketCapitalization: 148.56,
      tradingVolume: 148.56,
    },
    {
      id: 3,
      stockName: "Microsoft Corporation",
      currentPrice: 286.54,
      marketCapitalization: 148.56,
      tradingVolume: 148.56,
    },
  ];
  const handleCreateButton = () => {
    navigate("/stock/add");
  };
  return (
    <div className="flex flex-col h-[80vh] w-[100%]">
      <h1>주식 리스트</h1>
      <ul>
        {stocks.map((stock) => (
          <li key={stock.id}>
            <NavLink
              to={`/stock/${stock.id}`}
              className="flex justify-evenly w-full"
            >
              <div className="w-[30%]">{stock.id}</div>
              <div className="w-[30%]">{stock.stockName}</div>
              <div className="w-[30%]">{stock.currentPrice}</div>
              <div className="w-[30%]">{stock.marketCapitalization}</div>
              <div className="w-[30%]">{stock.tradingVolume}</div>
            </NavLink>
          </li>
        ))}
      </ul>
      <Button onClick={handleCreateButton} className="w-[10%]">
        추가
      </Button>
    </div>
  );
}
