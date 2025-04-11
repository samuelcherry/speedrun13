import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const display_name = localStorage.getItem("display_name");

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="header">
      <div>Welcome, {display_name}</div>
      <button type="button" className="styleButton" onClick={handleLogOut}>
        Log Out
      </button>
    </div>
  );
};

export default Header;
