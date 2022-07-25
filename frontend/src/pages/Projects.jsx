/* eslint-disable react/prop-types */
import { useState, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/projects.scss";
import axios from "../services/axios";
import { SiReact } from "react-icons/si";
import { DiJavascript1 } from "react-icons/di";
import { SiCss3 } from "react-icons/si";

const AddProjectInitial = {
  title: "",
  description: "",
};

const AddProjectForm = (state, action) => {
  switch (action.type) {
    case "ADD_TITLE":
      return { ...state, title: action.payload };
    case "ADD_DESCRIPTION":
      return { ...state, description: action.payload };
    case "RESET_FORM":
      return { ...AddProjectInitial };
    default:
      return state;
  }
};

const deleteProject = async (id) => {
  if (window.confirm("Êtes-vous sûr de vouloir supprimer ce projet ?"))
    try {
      await axios.delete(`projects/${id}`, {
        withCredentials: true,
      });
    } catch (err) {
      return alert(err.response.data);
    }
  return fetchProjects();
};

function Projects({ login }) {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [file, setFile] = useState("");
  const [projectForm, dispatch] = useReducer(AddProjectForm, AddProjectInitial);

  const addDocument = async (e) => {
    e.preventDefault();
    try {
      const newDocument = {
        title: projectForm.title,
        description: projectForm.description,
      };
      const documentData = new FormData();
      documentData.append("file", file);
      documentData.append("projectData", JSON.stringify(newDocument));
      const addedDocument = await axios
        .post("projects?file=projects", documentData, {
          withCredentials: true,
        })
        .then((response) => response.data);
      if (addedDocument) {
        // fetchDocuments();
        navigate("/projects");
        return alert("Projet ajouté avec succés");
      }
      return alert("Une erreur s'est produite à l'ajout du projet");
    } catch (err) {
      return alert(err.response.data);
    }
  };

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
        <ul className="project-display">
          {projects.map((project) => (
            <div key={project.id} className="project-ul">
              {login && (
                <button
                  className="delete-button"
                  aria-label="Delete"
                  type="button"
                  onClick={() => deleteProject(project.id)}
                >
                  X
                </button>
              )}
              <li className="project-li">{project.title}</li>
              <li className="project-li">{project.description}</li>
              <p>Languages et techno utilisées : </p>
              <li>
                <SiReact />
                --ReactJs
              </li>
              <li>
                <DiJavascript1 />
                --Javascript
              </li>
              <li>
                <SiCss3 />
                --CSS
              </li>

              <img
                className="img-project"
                src={`${import.meta.env.VITE_BACKEND_ASSETS_URL}${
                  project.imgLink
                }`}
                alt={project.alt}
              />
            </div>
          ))}
        </ul>
      ) : (
        <h2>No Data to display</h2>
      )}

      {login && (
        <div className="add-projet-container">
          <h1>AJOUTER UN NOUVEAU PROJET</h1>
          <span className="stylingBar" />
          <form className="addProjet" onSubmit={addDocument}>
            <p>
              Nom du document : <span className="textRed">*</span>
            </p>
            <input
              type="text"
              placeholder="Nom"
              value={projectForm.title}
              onChange={(e) =>
                dispatch({ type: "ADD_TITLE", payload: e.target.value })
              }
            />
            <p>
              Description courte : <span className="textRed">*</span>
            </p>
            <textarea
              cols="80"
              rows="8"
              placeholder="Description"
              onChange={(e) =>
                dispatch({ type: "ADD_DESCRIPTION", payload: e.target.value })
              }
            />

            <p>
              Choisissez une image : <span className="textRed">*</span>
            </p>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />

            <button type="submit" className="submitButton">
              Créer
            </button>
          </form>
        </div>
      )}
    </section>
  );
}

export default Projects;
