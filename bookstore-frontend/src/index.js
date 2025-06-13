import React from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";
import Header from "./components/layout/Header";
import LandingPage from "./components/layout/LandingPage";
import PrivateRoute from "./components/layout/PrivateRoute";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<LandingPage />} />
            <Route
              path="/catalogue"
              element={<div>Catalogue Page (Coming Soon)</div>}
            />
            <Route
              path="/gallery"
              element={<div>Gallery Page (Coming Soon)</div>}
            />
            <Route
              path="/about"
              element={<div>About Us Page (Coming Soon)</div>}
            />
            <Route
              path="/contact"
              element={<div>Contact Page (Coming Soon)</div>}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

// Create a root and render the App
const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;
