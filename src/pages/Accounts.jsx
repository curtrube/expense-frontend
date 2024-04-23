import { useState, useEffect } from 'react';
import AccountCard from '../components/AccountCard';
import { useAuth } from '../contexts/authProvider';

const getAccounts = async (accessToken, setAccounts) => {
  const response = await fetch('http://localhost:3000/api/accounts', {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${accessToken}`,
    },
  });
  if (response.ok) {
    const data = await response.json();
    setAccounts(data.accounts);
  }
};

export default function Accounts() {
  const { token } = useAuth();
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    getAccounts(token, setAccounts);
  }, []);

  return (
    <div>
      <div className="d-flex">
        {accounts.map((item, index) => (
          <div className="m-1" key={index}>
            <AccountCard {...item} />
          </div>
        ))}
      </div>
    </div>
  );
}
