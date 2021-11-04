const fs = require("fs");
const path = require("path");
const notes = require("./db/db.json");
const express = require("express");
const htmlRoutes = require('./routes/htmlRoutes');
const apiRoutes = require('./routes/apiRoutes');
const uniqid = require('uniqid');

const app = express();

const PORT = process.env.PORT || 3001;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(`${__dirname}/public`)));


app.use('/api', apiRoutes);

app.use('/', htmlRoutes);

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});








// //Delete function:
// app.delete("/api/notes/:id", (req, res) => {
//   res.send("Got a DELETE request at /api/notes/:id");

//   let id = req.params.id;

//   let idLess = notes.filter((less) => {
//     return less.id < id;
//   });

//   let idGreater = notes.filter((greater) => {
//     return greater.id > id;
//   });

//   notes = idLess.concat(idGreater);

//   newNotes();
// });