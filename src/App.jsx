import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Transactions from './components/Transactions';
import Categories from './components/Categories';
import Accounts from './components/Accounts';
import About from './components/About';

function App() {
  const [display, setDisplay] = useState('Hello World');

  function handleSelect(selection) {
    console.log(selection);
    setDisplay(selection);
  }

  return (
    <>
      <Navbar handleSelect={handleSelect} isSelected={display} />
      {display === 'home' && <Home />}
      {display === 'transactions' && <Transactions />}
      {display === 'categories' && <Categories />}
      {display === 'accounts' && <Accounts />}
      {display === 'about' && <About />}
    </>
  );
}

export default App;
