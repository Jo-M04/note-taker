const express = require("express");

const pr = require("./routes/pages");
const nr = require("./routes/notes");

const app = express();

const PORT = process.env.Port || 3001;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use("/", pr);
app.use("/", nr);
app.listen(PORT, () => {
  console.info(`Server started on http://localhost:${PORT}`);
});
