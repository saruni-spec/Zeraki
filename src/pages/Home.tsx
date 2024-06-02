import { useEffect, useRef, useState } from "react";
import "../static/home.css";
import Dashboard from "./Dashboard";
import Schools from "./Schools";
import Landing from "./Landing";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  const [dashboard, setDashboard] = useState(false);
  const [schools, setSchools] = useState(false);
  const [landing, setLanding] = useState(true);

  const [sideNav, setSideNav] = useState(true);

  const handleDashboard = () => {
    setDashboard(true);
    setSchools(false);
    setLanding(false);
  };

  const handleSchools = () => {
    setDashboard(false);
    setSchools(true);
    setLanding(false);
  };

  const toggleSideNav = () => {
    setSideNav(!sideNav);
  };

  const menuRef = useRef<HTMLUListElement>(null);

  const clickOutside = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setSideNav(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [menuRef, sideNav]);

  return (
    <div id="home" className={sideNav ? "shift-left" : ""}>
      <ul id="sideNav" ref={menuRef}>
        <li onClick={handleDashboard} className={dashboard ? "isActive" : ""}>
          Dashboard
        </li>
        <li onClick={handleSchools} className={schools ? "isActive" : ""}>
          Schools
        </li>
      </ul>
      <div
        id="division"
        title={sideNav ? "Close Side Menu" : "Open Side Menu"}
        onClick={toggleSideNav}
      ></div>

      <button
        type="button"
        onClick={toggleSideNav}
        id={landing ? "landingSideNav" : "SideNavMenu"}
        className="noTextButton"
      >
        <p>Menu</p>
        <FontAwesomeIcon icon={faBars} />
      </button>

      <div id="main">
        {landing && <Landing />}
        {dashboard && <Dashboard />}
        {schools && <Schools />}
      </div>
    </div>
  );
};

export default Home;
