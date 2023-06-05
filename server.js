const express = require("express");
const fs = require("fs");
const app = express();

const data = JSON.parse(fs.readFileSync(`${__dirname}/movie-data/data.json`));

app.get("/movies", (req, res) => {
  res.status(200).json(data);
});

const port = 8000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});
