
import "../styles/Nav.css"
import { Link, useLocation } from "react-router-dom";

const Nav = () => {
  // TODO: Add necessary code to display the navigation bar and link between the pages

  const location = useLocation();

  return (
    <div className="nav">
      <Link  to="/" className={location.pathname === '/' ? "tab selected" : "tab"}>Home</Link>
      <Link to="/SavedCandidates"className={location.pathname === '/SavedCandidates' ? "tab selected" : "tab"}>Potential Candidates</Link>
    </div>
  )
};

export default Nav;
