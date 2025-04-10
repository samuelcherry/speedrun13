import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const email = data.get("email");
    const password = data.get("password");
    const displayName = data.get("displayName");

    const res = await fetch("http://localhost:3001/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, displayName })
    });

    const authData = await res.json();

    if (res.ok) {
      alert("Account created! Please log in.");
      navigate("/");
    } else {
      alert(authData.error);
    }
  };

  return (
    <form className="formContainer" onSubmit={handleRegister}>
      <div className="formInputs">
        <div className="inputs">
          <label htmlFor="displayName">Display Name</label>
          <input type="displayName" name="displayName" required />
        </div>
        <div className="inputs">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" required />
        </div>
        <div className="inputs">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" required />
        </div>
      </div>
      <div className="formButtons">
        <button className="styleButton" type="submit">
          Register
        </button>
        <Link className="styleButton" to="/">
          Back
        </Link>
      </div>
    </form>
  );
};

export default Register;
