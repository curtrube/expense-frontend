import { useState, useEffect } from 'react';
import Spinner from '../components/Spinner';
import { useAuth } from '../hooks/authProvider';
import Cookies from 'js-cookie';

function getTransactions(accessToken, setTransactions, setIsLoading) {
  fetch('http://localhost:3000/api/transactions', {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      setTransactions(data.transactions);
      setIsLoading(false);
    })
    .catch((err) => {
      console.error('Error fetching transactions', err);
      setIsLoading(true);
    });
}

function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    getTransactions(token, setTransactions, setIsLoading);
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

export default Dashboard;
