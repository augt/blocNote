import "./App.css";
import React from "react";
// react router
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// pages
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import NoteList from "./pages/NoteList";
import Error from "./pages/ErrorPage"

//context

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<NoteList />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
