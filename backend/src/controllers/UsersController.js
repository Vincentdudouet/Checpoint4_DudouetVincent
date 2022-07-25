const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const models = require("../models");

const deleteImage = (pathImage) => {
  try {
    fs.unlinkSync(pathImage);
  } catch (err) {
    console.error(err);
  }
};

class UsersController {
  static browse = (req, res) => {
    models.users
      .findAll()
      .then(([rows]) => {
        res.send(rows);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static read = (req, res) => {
    models.users
      .find(req.params.id)
      .then(([rows]) => {
        if (rows[0] == null) {
          res.sendStatus(404);
        } else {
          res.send(rows[0]);
        }
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  //  Checks that the data recieved is valid, checks if the account to be modified exists, then updates the dabase with the new data
  static edit = async (req, res) => {
    const data = req.body;
    const userId = parseInt(req.params.id, 10);
    const imgToDelete = data.imgLink
      ? await models.users.findImgToDelete(userId).then((user) => {
          return user?.imgLink;
        })
      : null;
    const pathImage = data.imgLink
      ? path.join(__dirname, `../../public/assets/images/users/${data.imgLink}`)
      : null;
    try {
      const validData = await models.users.validate(data, false);
      if (!validData) {
        if (data.imgLink) deleteImage(pathImage);
        return res.status(400).send("Data provided is invalid or incomplete");
      }
      const accountExists = await models.users.accountExistCheck(userId);
      if (!accountExists) {
        if (data.imgLink) deleteImage(pathImage);
        return res
          .status(404)
          .send(
            `Can not edit user ${req.params.id}, because it does not exists`
          );
      }
      await models.users.updateUser(data, userId);
      if (imgToDelete)
        deleteImage(
          path.join(
            __dirname,
            `../../public/assets/images/users/${imgToDelete}`
          )
        );
      return res.sendStatus(204);
    } catch (err) {
      if (data.imgLink) deleteImage(pathImage);
      return res.status(500).send(err);
    }
  };

  static add = (req, res) => {
    const users = req.body;

    // TODO validations (length, format...)

    models.users
      .insert(users)
      .then(([result]) => {
        res.status(201).send({ ...users, id: result.insertId });
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  static delete = (req, res) => {
    models.users
      .delete(req.params.id)
      .then(() => {
        res.sendStatus(204);
      })
      .catch((err) => {
        console.error(err);
        res.sendStatus(500);
      });
  };

  // Connect the user with email and password
  static login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).send("You must provide an email and a password");
    }

    try {
      const validData = await models.users.loginValidate({
        email,
        password,
      });

      if (!validData) {
        return res
          .status(400)
          .send("You must provide a valid email and password");
      }
      const user = await models.users.findByEmail(email);

      if (!user[0]) {
        return res.status(404).send(`User with email "${email}" not found`);
      }

      //  Checks password and create accessToken
      if (await models.users.passwordCheck(email, password)) {
        const token = jwt.sign(
          {
            id: user[0].id,
            firstname: user[0].firstname,
            lastname: user[0].lastname,
            email: user[0].email,
          },
          process.env.ACCESS_JWT_SECRET,
          { expiresIn: process.env.ACCESS_JWT_EXPIRESIN }
        );

        return res
          .cookie("accessToken", token, {
            httpOnly: true,
            secure: process.env.ACCESS_JWT_SECURE === "true",
            maxAge: parseInt(process.env.ACCESS_JWT_COOKIE_MAXAGE, 10),
          })
          .status(200)
          .json(user[0]);
      }
      return res.status(403).send("Invalid creditentials");
    } catch (err) {
      res.sendStatus(500);
    }
    return null;
  };

  // Disconnect the user with the clear token
  static logout = (req, res) => {
    const token = req.cookies.accessToken;

    if (!token) {
      return res.status(418).send("You are not logged in");
    }
    return res.clearCookie("accessToken").sendStatus(200);
  };
}

module.exports = UsersController;
