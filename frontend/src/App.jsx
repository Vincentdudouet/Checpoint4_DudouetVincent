import Home from "@pages/Home";
import Welcome from "@pages/Welcome";
import AboutMe from "@pages/AboutMe";
import { useState, useEffect } from "react";
import "./styles/App.scss";
import { Route, Routes } from "react-router-dom";
import Projects from "@pages/Projects";
import Login from "@components/login";

function App() {
  // eslint-disable-next-line
  const [user, setUser] = useState();
  const [login, setLogin] = useState(false);

  // const checkConnection = () => {

  // };

  useEffect(() => {
    // checkConnection();
  }, []);
  return (
    <div className="App">
      <Login setLogin={setLogin} login={login} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/about-me" element={<AboutMe />} />
        <Route path="/projects" element={<Projects login={login} />} />
        <Route path="/projects/:id" />
      </Routes>
    </div>
  );
}

export default App;
