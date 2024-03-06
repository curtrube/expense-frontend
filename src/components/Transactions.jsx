import { useState, useEffect } from 'react';

function getTransactions(setTransactions) {
  fetch('http://localhost:3000/transactions')
    .then((response) => response.json())
    .then((data) => setTransactions(data.transactions));
}

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  useEffect(() => {
    getTransactions(setTransactions);
  }, []);

  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Date</th>
            <th scope="col">Merchant</th>
            <th scope="col">Amount</th>
            <th scope="col">Account</th>
            <th scope="col">Category</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((item, index) => (
            <tr key={index}>
              <td scope="row">{item.date.split('T')[0]}</td>
              <td>{item.merchant}</td>
              <td>{item.amount}</td>
              <td>{item.account}</td>
              <td>{item.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
