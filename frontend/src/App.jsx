import Home from "@pages/Home";
// import NotFound from "@pages/NotFound";
import Welcome from "@pages/Welcome";
import AboutMe from "@pages/AboutMe";
import "./styles/App.scss";
import { Route, Routes } from "react-router-dom";
import Projects from "@pages/Projects";
import Login from "@components/login";

function App() {
  return (
    <div className="App">
      <Login />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/acceuil" />
        <Route path="/about-me" element={<AboutMe />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" />
      </Routes>
    </div>
  );
}

export default App;
