const fs = require('fs');
const router = require('express').Router();
const path = require('path');
const notes = require('../../db/db.json');
const uniqid = require('uniqid');

router.get("/notes", (req, res) => {
  res.json(notes);
});

const newNotes = (newNotes) => {
  fs.writeFileSync(
    path.join(__dirname, "../../db/db.json"), 
    JSON.stringify(notes), (err) => {
    if (err) {
      console.log("error");
      return console.log(err);
    }
  });
};

router.post("/notes", (req, res) => {
  const newNote = req.body;

  newNote["id"] = uniqid();
  console.log(newNote);

  //Push the new note:
  notes.push(newNote);

  //Rewrite note:
  newNotes();
  return res.status(200).end();
});


router.delete("/notes/:id", function (req, res) {
  notes.splice(req.params.id, 1);
  console.log(req.params.id);

  res.redirect(req.get('referer'));
});

module.exports = router;
