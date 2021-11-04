const fs = require('fs');
const router = require('express').Router();
const path = require('path');
const notes = require('../../db/db.json');
const newNote = require('../../lib/note,');
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

// router.delete("/notes/:id", (req, res) => {
//   item.remove({
//     _id: req.params.id
//   }, err => {
//     if(err) {
//       res.send(err);
//     }
//     else{
//       console.log("deleted!")
//     }
//   })
// })


module.exports = router;
