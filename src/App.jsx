import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthProvider from './hooks/authProvider';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Categories from './pages/Categories';
import Accounts from './pages/Accounts';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Register from './components/Register';
import Login from './components/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <>
      <Router>
        {/* // <AuthProvider> */}
        <Navbar isAuthenticated={isAuthenticated} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />} />
          <Route element={<PrivateRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/accounts" element={<Accounts />} />
          </Route>
        </Routes>
        {/* </AuthProvider> */}
      </Router>
    </>
  );
}

export default App;
