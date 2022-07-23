import { Link } from "react-router-dom";
import "./Styles/Navbar.css";

function Navbar() {
  return (
    <nav id="navbar">
      <div className="nav-wrapper">
        <div className="logo">
          <Link to="/" className="link">
            CrowD
          </Link>
        </div>

        {/* <!-- Navbar Links --> */}
        <ul id="menu">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/Campaigns">Campaigns</Link>
          </li>
          <li>
            <Link to="/Campaigns/New">New</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
