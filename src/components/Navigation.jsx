import { Link } from "react-router-dom";
import { FiHome, FiLogOut, FiPlusCircle } from "react-icons/fi";
import PropTypes from "prop-types";

const Navigation = ({ logout, name }) => {
  return (
    <nav className="navigation">
      <ul>
        <li>
          <Link to="/">
            <FiHome />
          </Link>
        </li>
        <li>
          <Link to="/add">
            <FiPlusCircle />
          </Link>
        </li>
        <li>
          <button onClick={logout}>
            {name}
            <FiLogOut />
          </button>
        </li>
      </ul>
    </nav>
  );
};

Navigation.propTypes = {
  logout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default Navigation;
