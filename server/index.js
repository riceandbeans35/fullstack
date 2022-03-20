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
  const { name, email, password, store } = req.body;

  db.query(
    "INSERT INTO merchants (name, email, password, store) VALUES (?, ?, ?, ?)",
    [name, email, password, store],
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

app.post("/createstore", (req, res) => {
  const { merchant_id, item_name, item_price, item_quantity } = req.body;

  db.query(
    "INSERT INTO merchantstores (merchant_id, item_name, item_price, item_quantity) VALUES (?, ?, ?, ?)",
    [merchant_id, item_name, item_price, item_quantity],
    (err, results) => {
      if (err) {
        console.error("Error posting merchant items: " + err);
        res
          .status(500)
          .json({ error: "An error occurred while posting merchant items" });
        return;
      }

      res.status(201).json({ message: "Merchant items posted successfully" });
    }
  );
});

app.get("/storelist", (req, res) => {
  db.query("SELECT store FROM merchants", (err, results) => {
    if (err) {
      console.error("Error fetching store names:", err);
      res
        .status(500)
        .json({ error: "An error occurred while fetching store names" });
      return;
    }

    const storeNames = results.map((result) => result.store);
    res.status(200).json(storeNames);
  });
});

app.listen(3001, () => {
  console.log(`Server is running on port 3001`);
});
