const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const fs = require("fs");

const User = require("../models/User");
const Note = require("../models/Note");

User.hasMany(Note, { onDelete: "CASCADE" }, { as: "notes" });

exports.signup = (req, res, next) => {
  bcrypt
    .hash(req.body.password, 10)
    .then((hash) => {
      const user = {
        email: req.body.email,
        password: hash,
      };
      User.create(user)
        .then(() =>
          res.status(201).json({
            message: "Utilisateur créé ! Rendez-vous sur la page de connexion.",
          })
        )
        .catch((error) => {
          // prevent sending sensible data to the front-end
          delete error.errors[0].instance.dataValues.password;
          delete error.errors[0].instance.dataValues.id;
          delete error.errors[0].instance.dataValues.uuid;
          delete error.errors[0].instance.dataValues.createdAt;
          delete error.errors[0].instance.dataValues.updatedAt;

          res.status(400).json({ error });
        });
    })
    .catch((error) => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.status(401).json({ error: "Utilisateur non trouvé" });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({ error: "Mot de passe incorrect !" });
          }
          res.status(200).json({
            uuid: user.uuid,
            message: "Utilisateur connecté !",
            token: jwt.sign({ userId: user.id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "24h",
            }),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};




// password and email check
const passwordSchema = require("../models/password");

exports.passwordCheck = (req, res, next) => {
  if (!passwordSchema.validate(req.body.password)) {
    res.status(400).json({
      message:
        "Le mot de passe doit contenir entre 8 et 60 caractères, dont une majuscule, une minuscule et un chiffre.",
    });
  } else {
    next();
  }
};

exports.emailCheck = (req, res, next) => {
  const validEmail = (email) => {
    let emailRegexp = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    let isRegexTrue = emailRegexp.test(email);
    isRegexTrue
      ? next()
      : res.status(400).json({ message: "Adresse email non valide" });
  };
  validEmail(req.body.email);
};
