import axios from "axios";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export default function AddPage() {
  const [stockName, setStockName] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [marketCapitalization, setMarketCapitalization] = useState("");
  const [tradingVolume, setTradingVolume] = useState("");

  const handlebutton = () => {
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
  console.log("test");
  return (
    <div className="flex flex-col h-[80vh] w-[100%]">
      <h1>주식 추가</h1>
      <input
        type="text"
        placeholder="주식 이름"
        className="flex w-[30%] border"
        onChange={(e) => {
          setStockName(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="현재가"
        className="flex w-[30%] border"
        onChange={(e) => {
          setCurrentPrice(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="시가총액"
        className="flex w-[30%] border"
        onChange={(e) => {
          setMarketCapitalization(e.target.value);
        }}
      />

      <input
        type="text"
        placeholder="거래량"
        className="flex w-[30%] border"
        onChange={(e) => {
          setTradingVolume(e.target.value);
        }}
      />
      <button
        onClick={handlebutton}
        className="bg-slate-200 flex w-[50px] justify-center"
      >
        추가
      </button>
      <NavLink
        to={"/stocks"}
        className="bg-slate-200 flex w-[50px] justify-center"
      >
        뒤로가기
      </NavLink>
    </div>
  );
}
