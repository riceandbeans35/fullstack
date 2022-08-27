const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const nodemailer = require("nodemailer");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`A user connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

server.listen(3002, () => {
  console.log("WebSocket server is running on port 3002");
});

app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "atlasbusiness35@gmail.com",
    pass: "rayg bfki dpkx gfwm",
  },
});

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
  db.query("SELECT store, id FROM merchants", (err, results) => {
    if (err) {
      console.error("Error fetching store names:", err);
      res
        .status(500)
        .json({ error: "An error occurred while fetching store names" });
      return;
    }

    res.status(200).json(results);
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

app.get("/inventory/:id", (req, res) => {
  const merchant = req.params.id;

  if (!merchant) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  db.query(
    "SELECT inventory_id, item_name, item_price, item_quantity FROM inventory WHERE merchant_id = ?",
    [merchant],
    (err, results) => {
      if (err) {
        console.error("Error fetching inventory items:", err);
        res
          .status(500)
          .json({ error: "An error occurred while fetching inventory items" });
        return;
      }

      res.status(200).json(results);
    }
  );
});

app.post("/inventory", (req, res) => {
  const { item_name, item_price, item_quantity, merchant_id } = req.body;

  db.query(
    "INSERT INTO inventory (item_name, item_price, item_quantity, merchant_id) VALUES (?, ?, ?, ?)",
    [item_name, item_price, item_quantity, merchant_id],
    (err, results) => {
      if (err) {
        console.error("Error adding initial inventory items: " + err);
      }

      res.status(201).json({ message: "Added inventory successfully" });
    }
  );
});

app.delete("/inventory/:inventory_id", (req, res) => {
  const itemId = req.params.inventory_id;

  db.query(
    "DELETE FROM inventory WHERE inventory_id = ?",
    [itemId],
    (err, results) => {
      if (err) {
        console.error("Error removing item:", err);
        res
          .status(500)
          .json({ error: "An error occurred while removing the item" });
      } else {
        res.status(200).json({ message: "Item removed successfully" });
      }
    }
  );
});

app.put("/inventory/:inventory_id", (req, res) => {
  const itemId = req.params.inventory_id;
  const updatedItemData = req.body;

  db.query(
    "UPDATE inventory SET ? WHERE inventory_id = ?",
    [updatedItemData, itemId],
    (err, results) => {
      if (err) {
        console.error("Error updating item:", err);
        res
          .status(500)
          .json({ error: "An error occurred while updating the item" });
      } else {
        res.status(200).json({ message: "Item updated successfully" });
      }
    }
  );
});

app.post("/registercustomer", (req, res) => {
  const { name, email, password } = req.body;

  db.query(
    "INSERT INTO customers (customer_name, customer_email, customer_password) VALUES (?, ?, ?)",
    [name, email, password],
    (err, results) => {
      if (err) {
        console.error("Error registering customer: " + err);
        res
          .status(500)
          .json({ error: "An error occurred while registering the customer" });
        return;
      }
      res.status(201).json({ message: "Customer registered successfully" });
    }
  );
});

app.post("/customerlogin", (req, res) => {
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM customers WHERE customer_email = ? AND customer_password = ?",
    [email, password],
    (err, results) => {
      if (err) {
        console.error("Error during login:", err);
        return res
          .status(500)
          .json({ success: false, error: "An error occurred during login." });
      }

      if (results.length === 1) {
        const customer = results[0];
        return res.json({ success: true, customer });
      } else {
        return res.json({
          success: false,
          error: "Invalid email or password.",
        });
      }
    }
  );
});

app.get("/merchantstore/:merchantId", (req, res) => {
  const merchantId = req.params.merchantId;

  db.query(
    "SELECT * FROM inventory WHERE merchant_id = ?",
    [merchantId],
    (err, results) => {
      if (err) {
        console.error("Error fetching items by merchant:", err);
        res
          .status(500)
          .json({ error: "An error occurred while fetching items" });
        return;
      }

      res.status(200).json(results);
    }
  );
});

app.get("/storename/:id", (req, res) => {
  const merchantId = req.params.id;

  db.query(
    "SELECT store, id FROM merchants WHERE id = ?",
    [merchantId],
    (err, results) => {
      if (err) {
        console.error("Error fetching items by merchant:", err);
        res
          .status(500)
          .json({ error: "An error occurred while fetching items" });
        return;
      }

      res.status(200).json(results);
    }
  );
});

app.get("/customer/:customerId", (req, res) => {
  const customerId = req.params.customerId;

  db.query(
    "SELECT customer_name, customer_email FROM customers WHERE customer_id = ?",
    [customerId],
    (err, results) => {
      if (err) {
        console.error("Error fetching customer data:", err);
        res
          .status(500)
          .json({ error: "An error occurred while fetching customer data" });
        return;
      }

      res.status(200).json(results);
    }
  );
});

app.post("/order", async (req, res) => {
  try {
    const orderNumber = req.body["order_number"];
    const merchantId = req.body["merchant_id"];
    const customerId = req.body["customer_id"];
    const customerEmail = req.body["customer_email"];
    const customerName = req.body["customer_name"];
    const storeName = req.body["store"];
    const orderItems = req.body.order_items;

    const values = orderItems.map((item) => [
      orderNumber,
      merchantId,
      customerId,
      item.inventory_id,
      item.item_name,
      item.item_price,
      item.item_quantity,
      customerEmail,
      customerName,
      storeName,
    ]);

    const updatePromises = orderItems.map((item) => {
      return new Promise((resolve, reject) => {
        const orderedQuantity = item.item_quantity;
        const inventoryId = item.inventory_id;

        db.query(
          "SELECT item_quantity FROM Inventory WHERE inventory_id = ?",
          [inventoryId],
          (err, results) => {
            if (err) {
              reject(err);
            } else if (results && results.length > 0) {
              const currentQuantity = results[0].item_quantity;
              const newQuantity = currentQuantity - orderedQuantity;
              if (currentQuantity < orderedQuantity) {
                reject(new Error("Item is out of stock"));
              } else {
                db.query(
                  "UPDATE Inventory SET item_quantity = ? WHERE inventory_id = ?",
                  [newQuantity, inventoryId],
                  (err, results) => {
                    if (err) {
                      reject(err);
                    } else {
                      resolve();
                    }
                  }
                );
              }
            }
          }
        );
      });
    });

    await Promise.all(updatePromises);
    const mailOptions = {
      from: "atlasbusiness35@gmail.com",
      to: customerEmail,
      subject: ` ${storeName} - ${customerName}'s Order Confirmation`,
      html: `
    <p>Hi ${customerName},
    <p>Thank you for shopping at ${storeName}.</p>
    <p>Details for your order are below: </p>
    <p>Order Number: ${orderNumber}</p>
    <p><strong>Order Items: </strong></p>
    <ul>
      ${orderItems
        .map(
          (item) => `
        <ul>${item.item_name} - Price: $${item.item_price} - Quantity: ${item.item_quantity}</ul>
      `
        )
        .join("")}
    </ul>
    <p> View your order <a href="http://localhost:3000/orderconfirmation/${customerId}/${orderNumber}"> here </a> </p>  
  `,
    };
    db.query(
      "INSERT INTO customerorders (order_number, merchant_id, customer_id, inventory_id, item_name, item_price, item_quantity, customer_email, customer_name, store) VALUES ?",
      [values],
      (err, results) => {
        if (err) {
          console.error("Error adding customer order: " + err);
          res
            .status(500)
            .json({ error: "An error occurred while adding customer order" });
          return;
        }
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Error sending email:", error);
            res
              .status(500)
              .json({ error: "An error occurred while sending the email" });
          } else {
            console.log("Email sent:", info.response);
            res.status(201).json({
              message: "Customer order added successfully and email sent",
            });
            const orderNotification = {
              customerName: customerName,
              storeName: storeName,
              orderNumber: orderNumber,
              merchantId: merchantId,
            };
            io.emit("orderNotification", orderNotification);
          }
        });
      }
    );
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/order/:order_number", (req, res) => {
  const orderNumber = req.params.order_number;

  db.query(
    "SELECT * FROM customerorders WHERE order_number = ?",
    [orderNumber],
    (err, results) => {
      if (err) {
        console.error("Error fetching customer order data:", err);
        res.status(500).json({
          error: "An error occurred while fetching customer order data",
        });
        return;
      }

      res.status(200).json(results);
    }
  );
});

app.get("/customerorder/:merchantId", (req, res) => {
  const merchantId = req.params.merchantId;

  db.query(
    "SELECT * FROM customerorders WHERE merchant_id = ?",
    [merchantId],
    (err, results) => {
      if (err) {
        console.error("Error fetching customer order data:", err);
        res.status(500).json({
          error: "An error occurred while fetching customer order data",
        });
      } else {
        const orderHistory = [];
        let currentOrderNumber = null;
        let currentOrderIndex = -1;

        results.forEach((row) => {
          if (row.order_number !== currentOrderNumber) {
            currentOrderNumber = row.order_number;
            currentOrderIndex++;
            orderHistory[currentOrderIndex] = {
              order_number: currentOrderNumber,
              items: [],
            };
          }

          orderHistory[currentOrderIndex].items.push({
            item_name: row.item_name,
            item_quantity: row.item_quantity,
            item_price: row.item_price,
          });
        });

        res.status(200).json(orderHistory);
      }
    }
  );
});

app.listen(3001, () => {
  console.log(`Server is running on port 3001`);
});
