import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import SignUp from './pages/SignUp';
import Login from './pages/Login';

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
        {/* <Route
            path="/home"
            element={
              <RequireAuth loginPath="/login">
                <Home />
              </RequireAuth>
            }
          ></Route> */}
      </Routes>
    </Router>
  );
}
