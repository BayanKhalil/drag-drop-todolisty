import "../App.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const Navbar: React.FC = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  return (
    <div className="wrapper">
      <div className="navbar">
        <h1>TASKIFY</h1>

        <div className="rightNav">
          <button
            className="hamburger"
            onClick={() => {
              setIsNavExpanded(!isNavExpanded);
            }}
          >
            {/* icon from heroicons.com */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div
            className={
              isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
            }
          >
            <ul>
              <li>
              <Link className="content" to="/">Home</Link>
              </li>
              <li> <Link className="content" to="/main">My Tasks</Link></li>
              <li><a href="/">Sign In</a></li>
              <li><a href="/">Sign Up</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
