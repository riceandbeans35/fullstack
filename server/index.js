const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "atlas_user",
  password: "RiceandBeans",
  database: "atlas",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: " + err);
    return;
  }
  console.log("Connected to MySQL");
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  db.query(
    "INSERT INTO merchants (name, email, password) VALUES (?, ?, ?)",
    [name, email, password],
    (err, results) => {
      if (err) {
        console.error("Error registering merchant: " + err);
        res
          .status(500)
          .json({ error: "An error occurred while registering the merchant" });
        return;
      }

      res.status(201).json({ message: "Merchant registered successfully" });
    }
  );
});

app.get("/register", (req, res) => {
  res.status(200).json({ message: "This is a GET request to /register" });
});

app.listen(3000, () => {
  console.log(`Server is running on port 3000`);
});
