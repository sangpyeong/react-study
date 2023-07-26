import axios from "axios";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../components/Button";

interface StockData {
  stockName: string;
  currentPrice: number;
  marketCapitalization: number;
  tradingVolume: number;
}

export default function AddPage() {
  const navigate = useNavigate();

  const [stockName, setStockName] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [marketCapitalization, setMarketCapitalization] = useState("");
  const [tradingVolume, setTradingVolume] = useState("");

  const handleCreateButton = () => {
    const newStockData: StockData = {
      stockName,
      currentPrice: parseInt(currentPrice),
      marketCapitalization: parseInt(marketCapitalization),
      tradingVolume: parseInt(tradingVolume),
    };

    console.log(newStockData);
    
    axios
      .post("http://localhost:8080/stock/add", newStockData)
      .then((res) => {
        console.log(res.data);
        navigate(`/stocks`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleBackButton = () => {
    navigate("/stocks");
  };

  return (
    <div className="flex flex-col h-[80vh] w-[100%]">
      <h1>주식 추가</h1>
      <div className="flex flex-col justify-center items-center">
        <input
          type="text"
          placeholder="주식 이름"
          className="w-[30%] border"
          value={stockName}
          onChange={(e) => {
            setStockName(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="현재가"
          className="w-[30%] border"
          value={currentPrice}
          onChange={(e) => {
            setCurrentPrice(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="시가총액"
          className="w-[30%] border"
          value={marketCapitalization}
          onChange={(e) => {
            setMarketCapitalization(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="거래량"
          className="w-[30%] border"
          value={tradingVolume}
          onChange={(e) => {
            setTradingVolume(e.target.value);
          }}
        />
      </div>

      <div className="flex justify-evenly">
        <Button onClick={handleCreateButton}>추가</Button>
        <Button onClick={handleBackButton}>뒤로가기</Button>
      </div>
    </div>
  );
}
