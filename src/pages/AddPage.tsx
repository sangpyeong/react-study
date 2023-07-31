import axios from "axios";
import React, { useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";

interface StockData {
  stockName: string;
  currentPrice: number;
  marketCapitalization: number;
  tradingVolume: number;
}

export default function AddPage() {
  const navigate = useNavigate();

  const stockNameRef = useRef<HTMLInputElement>(null);
  const currentPriceRef = useRef<HTMLInputElement>(null);
  const marketCapitalizationRef = useRef<HTMLInputElement>(null);
  const tradingVolumeRef = useRef<HTMLInputElement>(null);

  const handleCreateButton = () => {
    const stockName = stockNameRef.current?.value;
    const currentPrice = currentPriceRef.current?.value;
    const marketCapitalization = marketCapitalizationRef.current?.value;
    const tradingVolume = tradingVolumeRef.current?.value;

    if (stockName && currentPrice && marketCapitalization && tradingVolume) {
      const newStockData: StockData = {
        stockName,
        currentPrice: parseInt(currentPrice),
        marketCapitalization: parseInt(marketCapitalization),
        tradingVolume: parseInt(tradingVolume),
      };
      axios
        .post("http://localhost:8080/stock/add", newStockData)
        .then((res) => {
          console.log(res.data);
          navigate(`/stocks`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleBackButton = () => {
    navigate("/stocks");
  };

  return (
    <div className="flex flex-col h-[80vh] w-[100%] items-center">
      <div className="flex flex-col w-2/3 justify-center items-center">
        <h1>주식 추가</h1>
        <div className="felx flex-col justify-center w-1/2 items-center">
          <Input label="종목 이름" type="text" ref={stockNameRef} />
          <Input label="현재가" type="number" ref={currentPriceRef} />
          <Input label="시가" type="number" ref={marketCapitalizationRef} />
          <Input label="거래량" type="number" ref={tradingVolumeRef} />
        </div>
        <div className="flex w-1/2 justify-evenly">
          <Button onClick={handleCreateButton} children="추가" />
          <Button onClick={handleBackButton} children="취소" />
        </div>
      </div>
    </div>
  );
}
