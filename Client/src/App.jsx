import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./Components/NavBar";
import HomePage from "./Pages/HomePage";
import PollPage from "./Pages/PollPage";
import CreatePage from "./Pages/CreatePage";

function App() {
    return(
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element={<HomePage/>}/>
          <Route path="/poll/:id" element={<PollPage/>}/>
          <Route path="create" element={<CreatePage/>}/>
        </Routes>
      </Router>
    )
}

export default App;
