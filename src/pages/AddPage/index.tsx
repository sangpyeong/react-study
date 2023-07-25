import axios from "axios";
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../components/Button";

export default function AddPage() {
  const navigate = useNavigate();

  const [stockName, setStockName] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [marketCapitalization, setMarketCapitalization] = useState("");
  const [tradingVolume, setTradingVolume] = useState("");

  const handleCreateButton = () => {
    console.log({
      stockName: stockName,
      currentPrice: currentPrice,
      marketCapitalization: marketCapitalization,
      tradingVolume: tradingVolume,
    });
    //fetch방법도 생각해보자
    axios
      .post("localhost8080:stock/add", {
        stockName: stockName,
        currentPrice: currentPrice,
        marketCapitalization: marketCapitalization,
        tradingVolume: tradingVolume,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleBackButton = () => {
    navigate("/stocks");
  };
  console.log("test");
  return (
    <div className="flex flex-col h-[80vh] w-[100%]">
      <h1>주식 추가</h1>
      <div className="flex flex-col justify-center items-center">
        <input
          type="text"
          placeholder="주식 이름"
          className="w-[30%] border"
          onChange={(e) => {
            setStockName(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="현재가"
          className="w-[30%] border"
          onChange={(e) => {
            setCurrentPrice(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="시가총액"
          className="w-[30%] border"
          onChange={(e) => {
            setMarketCapitalization(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="거래량"
          className="w-[30%] border"
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
