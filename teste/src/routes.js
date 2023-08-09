import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useIsAuthenticated } from 'react-auth-kit';

import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Home from './pages/Home';

const PrivateRoute = ({ Component }) => {
  const isAuthenticated = useIsAuthenticated();
  const auth = isAuthenticated();
  return auth ? <Component /> : <Navigate to="/login" />;
};

export default function Rotas() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<SignUp />}
        ></Route>
        <Route
          path="/login"
          element={<Login />}
        ></Route>
        <Route
          path="/home"
          element={<PrivateRoute Component={Home} />}
        ></Route>
      </Routes>
    </Router>
  );
}
