const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: "localhost",
  user: "your_mysql_user",
  password: "your_mysql_password",
  database: "your_database_name",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL: " + err);
    return;
  }
  console.log("Connected to MySQL");
});

app.use(bodyParser.json());

app.post("/api/merchant/register", (req, res) => {
  const { name, email, password } = req.body;

  const query =
    "INSERT INTO merchants (name, email, password) VALUES (?, ?, ?)";
  db.query(query, [name, email, hashedPassword], (err, results) => {
    if (err) {
      console.error("Error registering merchant: " + err);
      res
        .status(500)
        .json({ error: "An error occurred while registering the merchant" });
      return;
    }

    res.status(201).json({ message: "Merchant registered successfully" });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
