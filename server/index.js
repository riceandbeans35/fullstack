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

      const merchantId = results.insertId;

      const initialInventory = [
        {
          name: "Apple",
          price: 2.99,
          quantity: 50,
          merchant_id: merchantId,
        },
        {
          name: "Orange",
          price: 1.99,
          quantity: 30,
          merchant_id: merchantId,
        },
      ];

      db.query(
        "INSERT INTO inventory (item_name, item_price, item_quantity, merchant_id) VALUES ?",
        [
          initialInventory.map((item) => [
            item.name,
            item.price,
            item.quantity,
            item.merchant_id,
          ]),
        ],
        (err, results) => {
          if (err) {
            console.error("Error adding initial inventory items: " + err);
          }

          res.status(201).json({ message: "Merchant registered successfully" });
        }
      );
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

app.post("/login", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM merchants WHERE email = ? AND password = ?",
    [email, password],
    (err, results) => {
      if (err) {
        console.error("Error during login:", err);
        return res
          .status(500)
          .json({ success: false, error: "An error occurred during login." });
      }

      if (results.length === 1) {
        const merchant = results[0];
        return res.json({ success: true, merchant });
      } else {
        return res.json({
          success: false,
          error: "Invalid email or password.",
        });
      }
    }
  );
});

app.get("/inventory", (req, res) => {
  db.query("SELECT * FROM inventory", (err, results) => {
    if (err) {
      console.error("Error fetching inventory items:", err);
      res
        .status(500)
        .json({ error: "An error occurred while fetching inventory items" });
      return;
    }

    res.status(200).json(results);
  });
});

app.listen(3001, () => {
  console.log(`Server is running on port 3001`);
});
