const Note = require("../models/Note");
const User = require("../models/User");

Note.belongsTo(User, { as: "user" });

exports.createNote = (req, res, next) => {
  const note = {
    uuid: req.body.uuid,
    text: req.body.text,
    userId: req.auth.userId,
  };
  Note.create(note)
    .then((note) => {
      res.status(201).json({
        message: "Note créée !",
        id: note.id,
        createdAt: note.createdAt,
        updatedAt: note.updatedAt,
      });
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllNotes = (req, res, next) => {
 const uuid = req.auth.uuid;
  Note.findAll({
    include: [
      {
        model: User,
        as: "user",
      },
    ],
    where : {uuid},
    attributes: [
      "id",
      "uuid",
      "text",
      "createdAt",
      "updatedAt",
    ],
    order: [["createdAt", "DESC"]],
  })
    .then((notes) => res.status(200).json(notes))
    .catch((error) => res.status(404).json({ error }));
};

exports.checkPreviousNote = (req, res, next) => {
  id = req.params.id;
  try {
    Note.findOne({ where: { id } })
      .then((note) => {
        if (!note) {
          throw "Cette note n'existe pas !";
        }
        if (req.auth.uuid !== note.uuid) {
          throw "Requête non autorisée";
        } else {
          next();
        }
      })
      .catch((error) => {
        res.status(401).json(error);
      });
  } catch (error) {
    res.status(401).json({ error: error || "Cette action est impossible" });
  }
};

exports.modifyNote = (req, res, next) => {
  id = req.params.id;
  Note.update(
    { text: req.body.text },
    {
      where: {
        id,
      },
    }
  )
    .then(() => {
      return Note.findOne({ where: { id } });
    })
    .then((note) => {
      res.status(200).send({
        message: "Note mise à jour !",
        text: note.text,
        updatedAt: note.updatedAt,
      });
    })
    .catch((error) => res.status(404).json({ error }));
};

exports.deleteNote = (req, res, next) => {
  id = req.params.id;
  Note.destroy({
    where: {
      id,
    },
  })
    .then(() => res.status(200).send("Note supprimée !"))
    .catch((error) => res.status(404).json({ error }));
};
