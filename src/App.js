import logo from "./logo.svg";
import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import LeadsList from "./components/LeadsList";
import CreateLead from "./components/CreateLead";

function App() {
  // return function App() {
    return (
      // <header className="App-header">hellooooo</header>
      <AuthProvider>
        <Router>
          <div>
            <Routes>
              <Route path="/" element={<LeadsList />} />
              <Route path="/create-lead" element={<CreateLead />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
      
    );
  // };
}

export default App;
