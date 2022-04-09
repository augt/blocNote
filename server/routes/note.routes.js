const express = require("express");
const router = express.Router();
const noteCtrl = require("../controllers/note.controllers");

//const auth = require("../middlewares/auth.middlewares");

//router.get("/"/* , auth */, commentCtrl.getAllNotes);
//router.post("/"/* , auth */, commentCtrl.createNote);
/* router.put(
  "/:id", 
  //auth ,
  commentCtrl.checkPreviousNote,
  commentCtrl.modifyNote
); */
/* router.delete(
  "/:id" ,
  //auth ,
  commentCtrl.checkPreviousNote,
  commentCtrl.deleteNote
); */

module.exports = router;
