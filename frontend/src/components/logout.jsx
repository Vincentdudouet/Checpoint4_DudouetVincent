import axios from "@services/axios";
import { useEffect, useState } from "react";

function Logout() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const logout = async () => {
    try {
      if (!user) {
        return console.warn("You ae not logged in");
      }
      await axios
        .get("users/logout", {
          withCredentials: true,
        })
        .then((response) => response.data);
      // eslint-disable-next-line no-restricted-syntax
      setUser();
    } catch (err) {
      return console.warn(err);
    }
    return null;
  };

  useEffect(() => {
    logout();
  });

  return (
    <section className="loginForm">
      <h1>LOGIN OUT ...</h1>
    </section>
  );
}

export default Logout;
