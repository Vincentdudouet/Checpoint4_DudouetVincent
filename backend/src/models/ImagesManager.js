const AbstractManager = require("./AbstractManager");

class ImagesManager extends AbstractManager {
  static table = "images";

  insert(fileName) {
    return this.connection.query(`INSERT INTO ${ImagesManager.table} SET ?`, [
      fileName,
    ]);
  }

  findImageById(imageId) {
    return this.connection
      .query(`SELECT * FROM ${ImagesManager.table} WHERE id = ?`, [imageId])
      .then((result) => result[0]);
  }

  findProjectImage(projectId) {
    return this.connection
      .query(`SELECT * FROM ${ImagesManager.table} WHERE projects_id = ?`, [
        projectId,
      ])
      .then((result) => result[0]);
  }

  //   findUserImage(userId) {
  //     return this.connection
  //       .query(`SELECT * FROM ${ImagesManager.table} WHERE users_id = ?`, [
  //         userId,
  //       ])
  //       .then((result) => result[0]);
  //   }

  findImgToDelete(userId) {
    return this.connection
      .query(`SELECT * FROM ${ImagesManager.table} WHERE users_id = ?`, [
        userId,
      ])
      .then(([result]) => result[0]);
  }

  deleteImage(imageId) {
    return this.connection.query(
      `DELETE FROM ${ImagesManager.table} WHERE id = ?`,
      [imageId]
    );
  }

  deleteProjectImage(projectId) {
    return this.connection.query(
      `DELETE FROM ${ImagesManager.table} WHERE project_id = ?`,
      [projectId]
    );
  }
}

module.exports = ImagesManager;
