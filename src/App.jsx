import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Categories from './pages/Categories';
import Accounts from './pages/Accounts';
import Dashboard from './pages/Dashboard';

function App() {
  const [authenticated, setAuthenticated] = useState(null);

  // Function to handle successful login
  const handleLogin = () => {
    // Perform login logic
    setAuthenticated(true); // Set authentication state to true
  };

  // Function to handle logout
  const handleLogout = () => {
    // Perform logout logic
    setAuthenticated(false); // Set authentication state to false
  };

  return (
    <>
      <Router>
        {authenticated && <Navbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          {authenticated ? (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/accounts" element={<Accounts />} />
            </>
          ) : (
            // Redirect to /login
            <Route path="*" element={<Navigate to="/login" />} />
          )}
        </Routes>
      </Router>
    </>
  );
}

export default App;
