import { useState, useEffect } from "react";
import "../styles/AboutMe.scss";
import axios from "../services/axios";

function AboutMe() {
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    try {
      const { data } = await axios.get("users", { withCredentials: true });
      setUsers(data);
    } catch (err) {
      console.error(err.response.status);
      if (err.response.status === 401) {
        alert("You're not authenticated");
      } else if (err.response.status === 403) {
        alert("You're not authorized");
      }
    }
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <section className="aboutMe">
      {users.length ? (
        <ul>
          {users.map((user) => (
            <div className="aboutMe-ul">
              <li className="aboutMe-li" key={user.id}>
                {user.firstname} - {user.lastname}
              </li>
              <li className="aboutMe-li" key={user.id}>
                {user.age}ans
              </li>
              <li className="aboutMe-li" key={user.id}>
                {user.job}
              </li>
              <li className="aboutMe-li" key={user.id}>
                {user.description}
              </li>
            </div>
          ))}
        </ul>
      ) : (
        <h2>No Data to display</h2>
      )}
    </section>
  );
}

export default AboutMe;
