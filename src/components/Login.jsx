import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    const email = data.get("email");
    const password = data.get("password");

    console.log(email, password);
    console.log("data", data);

    const res = await fetch("http://localhost:3001/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const authData = await res.json();
    console.log(authData.user.displayname);

    if (res.ok) {
      const uuid = authData.user.id;
      const display_name = authData.user.displayname;
      console.log(display_name);
      localStorage.setItem("display_name", display_name);
      localStorage.setItem("uuid", uuid);
      navigate("/main");
    } else {
      alert(authData.error);
    }
  };

  return (
    <form className="formContainer" onSubmit={handleLogin}>
      <div className="formInputs">
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
          Login
        </button>
        <Link className="styleButton" to="/register">
          Register
        </Link>
      </div>
    </form>
  );
};

export default Login;
