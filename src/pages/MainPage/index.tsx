import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import axios from "axios";

export default function MainPage() {
  const [stocks, setStocks] = useState([
    {
      id: 1,
      stockName: "Apple Inc.",
      currentPrice: 148.56,
      marketCapitalization: 148.56,
      tradingVolume: 148.56,
    },
  ]);
  const [deleteStock, setDeleteStock] = useState<string[]>([]);
  useEffect(() => {
    axios
      .get("http://localhost:8080/stocks")
      .then((res) => {
        console.log(res.data);
        setStocks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const navigate = useNavigate();
  // const stocks = [
  //   {
  //     id: 1,
  //     stockName: "Apple Inc.",
  //     currentPrice: 148.56,
  //     marketCapitalization: 148.56,
  //     tradingVolume: 148.56,
  //   },
  //   {
  //     id: 2,
  //     stockName: "Alphabet Inc.",
  //     currentPrice: 2678.12,
  //     marketCapitalization: 148.56,
  //     tradingVolume: 148.56,
  //   },
  //   {
  //     id: 3,
  //     stockName: "Microsoft Corporation",
  //     currentPrice: 286.54,
  //     marketCapitalization: 148.56,
  //     tradingVolume: 148.56,
  //   },
  // ];
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
                    // 체크되었을 때, 해당 id를 deleteStock 배열에 추가
                    setDeleteStock([...deleteStock, value]);
                  } else {
                    // 체크가 해제되었을 때, 해당 id를 deleteStock 배열에서 제거
                    setDeleteStock((prevDeleteStock) =>
                      prevDeleteStock.filter((id) => id !== value)
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
