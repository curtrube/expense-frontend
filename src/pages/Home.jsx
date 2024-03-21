import { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';

function getTransactions(setTransactions, setIsLoading) {
  fetch('http://localhost:3000/transactions')
    .then((response) => response.json())
    .then((data) => {
      setTransactions(data.transactions);
      setIsLoading(false);
    })
    .catch((err) => {
      console.error('Error fetching transactions', err);
      setIsLoading(true);
    });
}

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    getTransactions(setTransactions, setIsLoading);
  }, []);

  return isLoading ? (
    <Spinner />
  ) : (
    <>
      {transactions.map((item, index) => (
        <div className="card flex-row m-2" key={index}>
          <div className="card-body">
            <h5 className="card-title">{item.merchant}</h5>
            <h6 className="card-subtitle mb-2 text-body-secondary">
              {item.category}
            </h6>
          </div>
          <div className="p-3">
            <p className="m-0">${item.amount}</p>
          </div>
        </div>
      ))}
    </>
  );
}
