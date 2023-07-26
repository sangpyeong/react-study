import React, { useEffect, useRef, useState } from "react";
import Button from "../../components/Button";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function DetailPage() {
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:8080/stock/${id}`)
      .then((res) => {
        console.log(res.data);
        setStock(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const [edit, setEdit] = useState(false);
  const [stockName, setStockName] = useState("");
  const [currentPrice, setCurrentPrice] = useState("");
  const [marketCapitalization, setMarketCapitalization] = useState("");
  const [tradingVolume, setTradingVolume] = useState("");
  const navigate = useNavigate();
  const [stock, setStock] = useState({
    id: 1,
    stockName: "Apple Inc.",
    currentPrice: 148.56,
    marketCapitalization: 148.56,
    tradingVolume: 148.56,
  });
  // const stock = {
  //   id: 1,
  //   stockName: "Apple Inc.",
  //   currentPrice: 148.56,
  //   marketCapitalization: 148.56,
  //   tradingVolume: 148.56,
  // };

  return (
    <div className="flex flex-col h-[80vh] w-[100%]">
      {edit ? (
        <div className="flex-col w-full items-center">
          <input
            placeholder={stock.stockName}
            type="text"
            className="border w-full"
            onChange={(e) => {
              setStockName(e.target.value);
            }}
          />
          <input
            placeholder={String(stock.currentPrice)}
            type="number"
            className="border w-full"
            onChange={(e) => {
              setCurrentPrice(e.target.value);
            }}
          />
          <input
            placeholder={String(stock.marketCapitalization)}
            type="text"
            className="border w-full"
            onChange={(e) => {
              setMarketCapitalization(e.target.value);
            }}
          />
          <input
            placeholder={String(stock.tradingVolume)}
            type="text"
            className="border w-full"
            onChange={(e) => {
              setTradingVolume(e.target.value);
            }}
          />
          <Button
            className="w-[100px]"
            onClick={() => {
              axios
                .post(`http://localhost:8080/stock/${id}/edit`, {
                  stockName: stockName,
                  currentPrice: parseInt(currentPrice),
                  marketCapitalization: parseInt(marketCapitalization),
                  tradingVolume: parseInt(tradingVolume),
                })
                .then((res) => {
                  console.log(res.data);
                  navigate(`/stocks`);
                })
                .catch((err) => {
                  console.log(err);
                });
            }}
          >
            수정
          </Button>
          <Button
            className="w-[100px]"
            onClick={() => {
              setEdit(false);
            }}
          >
            취소
          </Button>
        </div>
      ) : (
        <div>
          <div>{stock.stockName}</div>
          <div>현재가: {stock.currentPrice}</div>
          <div>시가: {stock.marketCapitalization}</div>
          <div>거래량: {stock.tradingVolume}</div>
          <Button
            className="w-[100px]"
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
      )}
    </div>
  );
}
