import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../wrapper/Home";
import FindJobs from "../wrapper/FindJobs";
import Employers from "../wrapper/Employers";
import Candidates from "../wrapper/Candidates";
import Dashboard from "../wrapper/Dashboard";
import Navbar from "../Navbar";

function AppRoute() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/findjobs" element={<FindJobs />} />
        <Route path="/employers" element={<Employers />} />
        <Route path="/candidates" element={<Candidates />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoute;
