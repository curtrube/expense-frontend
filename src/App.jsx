import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Categories from './pages/Categories';
import Accounts from './pages/Accounts';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute';
import Register from './components/Register';
import Login from './components/Login';
import { useAuth } from './contexts/authProvider';

function App() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // const navigate = useNavigate();

  useEffect(() => {
    console.log('authenticated ' + isAuthenticated);
    if (!user && !isAuthenticated) {
      navigate('/login');
    }
  }, [user, isAuthenticated]);

  return (
    <>
      {/* <Router> */}
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
      {/* </Router> */}
    </>
  );
}

export default App;
