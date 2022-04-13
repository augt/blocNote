const express = require("express");
const router = express.Router();
const noteCtrl = require("../controllers/note.controllers");

const auth = require("../middlewares/auth.middlewares");
router.get("/", auth , noteCtrl.getAllNotes);
router.post("/", auth , noteCtrl.createNote);
router.put(
  "/:id", 
  auth ,
  noteCtrl.checkPreviousNote,
  noteCtrl.modifyNote
);
router.delete(
  "/:id" ,
  auth ,
  noteCtrl.checkPreviousNote,
  noteCtrl.deleteNote
);

module.exports = router;
