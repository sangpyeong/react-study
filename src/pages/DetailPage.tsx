import React, { useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../components/Input";

interface Stock {
  id: number;
  stockName: string;
  currentPrice: number;
  marketCapitalization: number;
  tradingVolume: number;
}

interface StockData {
  stockName: string;
  currentPrice: number;
  marketCapitalization: number;
  tradingVolume: number;
}

export default function DetailPage() {
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    axios
      .get<Stock>(`http://localhost:8080/stock/${id}`)
      .then((res) => {
        console.log(res.data);
        setStock(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]); // Added dependency to re-fetch data when the 'id' changes
  const stockNameRef = useRef<HTMLInputElement>(null);
  const currentPriceRef = useRef<HTMLInputElement>(null);
  const marketCapitalizationRef = useRef<HTMLInputElement>(null);
  const tradingVolumeRef = useRef<HTMLInputElement>(null);

  const [edit, setEdit] = useState(false);

  const navigate = useNavigate();
  const [stock, setStock] = useState<Stock>();
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
        .post(`http://localhost:8080/stock/${id}/edit`, newStockData)
        .then((res) => {
          console.log(res.data);
          navigate(`/stocks`);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="flex flex-col h-[80vh] w-[100%]">
      {edit ? (
        <div className="flex flex-col w-full items-center ">
          <h1>종목 수정</h1>
          <div className="felx flex-col justify-center w-1/2 items-center">
            <Input label="종목 이름" type="text" ref={stockNameRef} />
            <Input label="현재가" type="number" ref={currentPriceRef} />
            <Input label="시가" type="number" ref={marketCapitalizationRef} />
            <Input label="거래량" type="number" ref={tradingVolumeRef} />
          </div>
          <div className="flex w-1/2 justify-evenly">
            <Button onClick={handleCreateButton} children="수정" />
            <Button
              onClick={() => {
                setEdit(false);
              }}
              children="취소"
            />
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full items-center ">
          <div>{stock?.stockName}</div>
          <div>현재가: {stock?.currentPrice}</div>
          <div>시가: {stock?.marketCapitalization}</div>
          <div>거래량: {stock?.tradingVolume}</div>
          <div className="flex w-full justify-evenly">
            <Button
              onClick={() => {
                setEdit(true);
              }}
            >
              수정
            </Button>
            <Button
              onClick={() => {
                navigate("/stocks");
              }}
            >
              뒤로가기
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
