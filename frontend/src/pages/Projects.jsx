import { useState, useEffect } from "react";
import "../styles/projects.scss";
import axios from "../services/axios";

function Projects() {
  const [projects, setProjects] = useState([]);

  const getProjects = async () => {
    try {
      const { data } = await axios.get("projects", { withCredentials: true });
      setProjects(data);
    } catch (err) {
      console.error(err.response.status);
      if (err.response.status === 401) {
        alert("Sorry, we have a problem");
      } else if (err.response.status === 403) {
        alert("You're not authorized");
      }
    }
  };

  useEffect(() => {
    getProjects();
  }, []);
  return (
    <section className="aboutMe">
      {projects.length ? (
        <ul>
          {projects.map((project) => (
            <div className="aboutMe-ul">
              <li className="aboutMe-li" key={project.id}>
                {project.title} - {project.date}
              </li>
              <li className="aboutMe-li" key={project.id}>
                {project.description}
              </li>
              {project?.images &&
                project.images.map((image) => (
                  <img key={image.id} src="" alt="" />
                ))}
            </div>
          ))}
        </ul>
      ) : (
        <h2>No Data to display</h2>
      )}
    </section>
  );
}

export default Projects;
