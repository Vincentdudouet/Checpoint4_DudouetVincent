import Home from "@pages/Home";
// import NotFound from "@pages/NotFound";
import Welcome from "@pages/Welcome";
import AboutMe from "@pages/AboutMe";
import "./styles/App.scss";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/acceuil" />
        <Route path="/about-me" element={<AboutMe />} />
        <Route path="/projets" />
        <Route path="/projets/:id" />
      </Routes>
    </div>
  );
}

export default App;
