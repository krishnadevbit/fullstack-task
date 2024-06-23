const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 3000;

const users = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.post("/submit", (req, res) => {
  const { name, email } = req.body;

  users.push({ name, email });

  console.log(`User added: Name: ${name}, Email: ${email}`);
  res.json({ message: "Form submitted successfully!" });
});

app.get("/users", (req, res) => {
  res.json(users);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
