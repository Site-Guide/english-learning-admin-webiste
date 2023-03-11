import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { account } from "./appwrite";
import AccountVerification from "./Components/AccountVerification";
import Auth from "./Components/auth";
import Dashboard from "./Components/dashboard";
import Navbar from "./Components/Navbar";
import PrivateRoute from "./Routes/PrivateRoute";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/accountVerification"
            element={<AccountVerification />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
