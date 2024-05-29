import { useState } from "react";
import "../static/home.css";
import Dashboard from "./Dashboard";
import Schools from "./Schools";

const Home = () => {
  const [dashboard, setDashboard] = useState(false);
  const [schools, setSchools] = useState(false);

  const handleDashboard = () => {
    setDashboard(true);
    setSchools(false);
  };

  const handleSchools = () => {
    setDashboard(false);
    setSchools(true);
  };

  const [sideNav, setSideNav] = useState(false);
  const toggleSideNav = () => {
    setSideNav(!sideNav);
  };

  return (
    <div id="home" className={sideNav ? "shift-left" : ""}>
      <ul id="sideNav">
        <li onClick={handleDashboard}>Dashboard</li>
        <li onClick={handleSchools}>Schools</li>
      </ul>
      <div id="division" onClick={toggleSideNav}></div>

      <div id="main">
        {dashboard && <Dashboard />}
        {schools && <Schools />}
        Home Page
      </div>
    </div>
  );
};

export default Home;
