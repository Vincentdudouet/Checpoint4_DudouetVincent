const argon2 = require("argon2");
const AbstractManager = require("./AbstractManager");
const {
  schemaForLogin,
  schemaForCreation,
  schemaForUpdateUser,
  // schemaForProject,
} = require("../joiSchema");

class UsersManager extends AbstractManager {
  static table = "users";

  // eslint-disable-next-line class-methods-use-this
  hashPassword(usersPassword) {
    return argon2.hash(usersPassword);
  }

  // eslint-disable-next-line class-methods-use-this
  verifyPassword(usersPassword, hashedPassword) {
    return argon2.verify(hashedPassword, usersPassword);
  }

  // eslint-disable-next-line class-methods-use-this
  async loginValidate(users) {
    try {
      await schemaForLogin.validateAsync(users);
      return true;
    } catch (err) {
      return false;
    }
  }

  async accountExistCheck(id) {
    const account = await this.connection
      .query(`SELECT id FROM ${this.table} WHERE id = ?`, [id])
      .then((accountId) => accountId[0][0]);
    if (!account) {
      return false;
    }
    return true;
  }

  // eslint-disable-next-line class-methods-use-this
  async validate(users, creation = true) {
    try {
      if (creation) {
        await schemaForCreation.validateAsync(users);
      } else {
        await schemaForUpdateUser.validateAsync(users);
      }
      return true;
    } catch (err) {
      return false;
    }
  }

  insert(users) {
    return this.connection.query(
      `insert into ${UsersManager.table} (firstname, lastname, email, password, age, imgLink) values (?, ?, ?, ?, ?, ?, ?)`,
      [
        users.firstname,
        users.lastname,
        users.email,
        users.password,
        users.age,
        users.imgLink,
      ]
    );
  }

  async passwordCheck(email, userPassword) {
    const password = await this.connection.query(
      `SELECT password FROM ${UsersManager.table} WHERE email = ?`,
      [email]
    );
    return this.verifyPassword(userPassword, password[0][0].password);
  }

  update(data, userId) {
    return this.connection.query(
      `UPDATE ${UsersManager.table} SET ? WHERE id = ? `,
      [data, userId]
    );
  }

  async findByEmail(email) {
    const user = await this.connection.query(
      `SELECT * FROM ${UsersManager.table} WHERE email = ?`,
      [email]
    );
    return user[0];
  }

  findImgToDelete(userId) {
    return this.connection
      .query(`SELECT * FROM ${UsersManager.table} WHERE id = ?`, [userId])
      .then(([result]) => result[0]);
  }

  async findByLogin(email) {
    const user = await this.connection.query(
      `SELECT * FROM ${UsersManager.table} WHERE email= ?`,
      [email]
    );
    return user;
  }
}

module.exports = UsersManager;
