import { useState, useEffect } from 'react';
import AccountCard from './AccountCard';

function getAccounts(setAccounts) {
  fetch('http://localhost:8080/accounts')
    .then((response) => response.json())
    .then((data) => setAccounts(data.accounts));
}

export default function Accounts() {
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    getAccounts(setAccounts);
  }, []);

  return (
    <div className="d-flex">
      {accounts.map((item, index) => (
        <div className="m-1" key={index}>
          <AccountCard {...item} />
        </div>
      ))}
    </div>
  );
}
