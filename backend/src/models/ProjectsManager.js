const AbstractManager = require("./AbstractManager");
const { schemaForProject } = require("../joiSchema");

class ProjectsManager extends AbstractManager {
  static table = "projects";

  findAll() {
    return this.connection.query(`SELECT * FROM  ${ProjectsManager.table}`);
  }

  findProjectImages() {
    return this.connection
      .query(`SELECT p.id, p.title, p.description, i.id AS imageId, i.imgLink, i.alt From ${ProjectsManager.table} As p JOIN
    images AS i on p.id=i.projects_id`);
  }

  findById(projectId) {
    return this.connection.query(
      `SELECT * FROM ${ProjectsManager.table} WHERE id = ?`,
      [projectId]
    );
  }

  insert(project) {
    return this.connection.query(`INSERT INTO ${ProjectsManager.table} SET ?`, [
      project,
    ]);
  }

  update(project, projectId) {
    return this.connection.query(
      `UPDATE ${ProjectsManager.table} SET  ? WHERE id = ? `,
      [project, projectId]
    );
  }

  // eslint-disable-next-line class-methods-use-this
  async validate(project) {
    try {
      await schemaForProject.validateAsync(project);
      return true;
    } catch (err) {
      return false;
    }
  }
}

module.exports = ProjectsManager;
