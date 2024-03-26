import { useState, useEffect } from 'react';
import AccountCard from '../components/AccountCard';

function getAccounts(setAccounts) {
  fetch('http://localhost:3000/api/accounts')
    .then((response) => response.json())
    .then((data) => setAccounts(data.accounts));
}

export default function Accounts() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    getAccounts(setAccounts);
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
