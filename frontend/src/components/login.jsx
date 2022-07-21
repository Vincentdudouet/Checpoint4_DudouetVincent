import "../styles/login.scss";
import { useState } from "react";
import axios from "@services/axios";
import { Link } from "react-router-dom";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [login, setLogin] = useState(false);
  const handleClick = () => {
    setLogin(!login);
  };

  const handleInput = (e) => {
    return setUser((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = user;
    if (!email || !password) {
      return alert("Please specify both email and password");
    }
    try {
      const userData = await axios
        .post("users/login", user, {
          withCredentials: true,
        })
        .then((response) => response.data);
      // eslint-disable-next-line no-restricted-syntax
      console.log(userData);
      alert("Successfully logged in");
      setLogin(true);
    } catch (err) {
      setLogin(false);
      if (err.response) {
        return alert(err.response.data);
      }
      return alert(err.message);
    }

    return setUser({ email: "", password: "" });
  };

  return (
    <form className="fields">
      <nav className="navBar">
        {login && (
          <input className="searchBar" type="text" placeholder="Search" />
        )}

        {!login && (
          <>
            <input
              className="email"
              type="text"
              id="email"
              name="email"
              placeholder="email"
              value={user.email}
              onChange={handleInput}
            />

            <input
              className="password"
              type="password"
              id="password"
              name="password"
              placeholder="password"
              value={user.password}
              onChange={handleInput}
            />
          </>
        )}

        <button
          type="button"
          onClick={(e) => (login ? handleClick(e) : handleSubmit(e))}
          className="connect"
        >
          {login ? "log out" : "log in"}
        </button>
      </nav>
    </form>
  );
}
