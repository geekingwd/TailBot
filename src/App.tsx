import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WelcomePage } from "./pages/WelcomePage";

export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<div>Login Page (Coming soon)</div>} />
        <Route path="/signup" element={<div>Signup Page (Coming soon)</div>} />
      </Routes>
    </Router>
  );
};

export default App;
