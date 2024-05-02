const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const bcrypt = require("bcrypt");

const app = express();
const port = 8080;
const server = http.createServer(app);
const io = socketIo(server);

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "mavens_advisor",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

app.use(bodyParser.json());
app.use(cors());

app.post("/api", (req, res) => {
  const {
    business_description,
    business_size,
    business_category,
    business_name,
    firstName,
    lastName,
    email,
    phone_no,
  } = req.body;
  const sql = `INSERT INTO subscription_form
    (business_description, business_size, business_category, business_name,
    firstname, lastname, email, phone_no)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(
    sql,
    [
      business_description,
      business_size,
      business_category,
      business_name,
      firstName,
      lastName,
      email,
      phone_no,
    ],
    (err, result) => {
      if (err) {
        console.error("Error inserting data:", err);
        return res.status(500).json({ error: "Error inserting data" });
      }
      console.log("Data inserted successfully");
      return res.status(200).json({ message: "Data inserted successfully" });
    }
  );
});

//app.post('/new_message', (req, res) => {
//  const {
//    email_address,
//    message
//  } = req.body;
//
//  const sql = 'INSERT INTO messages (email_address,admin_email, message) VALUES (?, ?)';
//  db.query(sql, [email_address,admin_email, message], (err, result) => {
//    if (err) {
//      console.error('Error inserting data:', err);
//      return res.status(500).json({ error: 'Error inserting data' });
//    }
//    console.log('Data inserted successfully');
//    return res.status(200).json({ message: 'Data inserted successfully' });
//  });
//});
app.post("/new_message", (req, res) => {
  const { email_address, admin_email, message } = req.body;

  const sql =
    "INSERT INTO messages (email_address, admin_email, message) VALUES (?, ?, ?)";
  db.query(sql, [email_address, admin_email, message], (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res.status(500).json({ error: "Error inserting data" });
    }
    console.log("Data inserted successfully");
    return res.status(200).json({ message: "Data inserted successfully" });
  });
});

//
//io.on('connection', (socket) => {
//  socket.on('initial_messages', ({ email_address }) => {
//    fetchMessages(email_address)
//      .then((messages) => {
//        socket.emit('initial_messages', messages);
//      })
//      .catch((error) => {
//        console.error('Error fetching initial messages:', error);
//      });
//  });
//
//  socket.on('new_message', ({ email_address, message }) => {
//    saveMessage(email_address, message)
//      .then((savedMessage) => {
//        io.emit('new_message', savedMessage);
//      })
//      .catch((error) => {
//        console.error('Error saving message:', error);
//      });
//  });
//});
//
//const fetchMessages = (email_address) => {
//  return new Promise((resolve, reject) => {
//    const sql = 'SELECT * FROM messages WHERE email_address = ?';
//    db.query(sql, [email_address], (err, results) => {
//      if (err) {
//        reject(err);
//      } else {
//        resolve(results);
//      }
//    });
//  });
//};
//
//const saveMessage = (email_address, message) => {
//  return new Promise((resolve, reject) => {
//    const sql = 'INSERT INTO messages (email_address, message) VALUES (?, ?)';
//    db.query(sql, [email_address, message], (err, result) => {
//      if (err) {
//        reject(err);
//      } else {
//        const savedMessage = { email_address, message, timestamp: new Date() };
//        resolve(savedMessage);
//      }
//    });
//  });
//};
app.post("/admin/login", (req, res) => {
  const { email_address, password } = req.body;

  const sql = "SELECT * FROM admin WHERE email = ?";
  db.query(sql, [email_address], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = results[0];
    bcrypt.compare(password, user.password, (bcryptErr, bcryptResult) => {
      if (bcryptErr) {
        console.error("Error comparing passwords:", bcryptErr);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (!bcryptResult) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      return res.status(200).json({ message: "Login successful" });
    });
  });
});

app.post("/customer/login", (req, res) => {
  const { email_address, password } = req.body;

  const sql = "SELECT * FROM user WHERE email_address = ?";
  db.query(sql, [email_address], (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = results[0];
    bcrypt.compare(password, user.password, (bcryptErr, bcryptResult) => {
      if (bcryptErr) {
        console.error("Error comparing passwords:", bcryptErr);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (!bcryptResult) {
        return res.status(401).json({ error: "Invalid email or password" });
      }

      return res.status(200).json({ message: "Login successful" });
    });
  });
});

app.post("/contactData", (req, res) => {
  const { full_name, email_address, message } = req.body;

  const query =
    "INSERT INTO contact_form (full_name, email_address, message) VALUES (?, ?, ?)";
  db.query(query, [full_name, email_address, message], (err, result) => {
    if (err) {
      console.error("Error inserting contact data:", err);
      res.status(500).json({ error: "Failed to submit contact form" });
      return;
    }
    console.log("Contact form submitted successfully");
    res.status(200).json({ message: "Contact form submitted successfully" });
  });
});

app.get("/subscription_form/:id", (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM subscription_form WHERE id = ?";

  db.query(sql, id, (error, results) => {
    if (error) {
      console.error("Error fetching subscription details:", error);
      return res
        .status(500)
        .send("Error fetching subscription details: " + error.message);
    }
    if (results.length === 0) {
      return res.status(404).send("No subscription found with the given ID.");
    }
    const subscriptionDetails = results[0];
    res.json(subscriptionDetails);
  });
});

app.post("/Customer/Signup", (req, res) => {
  const { email_address, user_name, password, confirm_password } = req.body;

  if (password !== confirm_password) {
    return res.status(400).json({ error: "Passwords do not match" });
  }

  bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
    if (hashErr) {
      console.error("Error hashing password:", hashErr);
      return res.status(500).json({ error: "Error hashing password" });
    }
  bcrypt.hash(confirm_password, 10, (hashErr, hashedConfirmPassword) => {
    if (hashErr) {
      console.error("Error hashing password:", hashErr);
       return res.status(500).json({ error: "Error hashing password" });
    }
    const sql =
      "INSERT INTO user (email_address, user_name, password, confirm_password) VALUES (?, ?, ?, ?)";
    db.query(sql, [email_address, user_name, hashedPassword, hashedConfirmPassword], (err, result) => {
      if (err) {
        console.error("Error inserting user data:", err);
        return res.status(500).json({ error: "Error inserting user data" });
      }
      console.log("User data inserted successfully");
      return res.status(201).json({ message: "User created successfully" });
    });
  });
});
});

app.delete("/subscriptions/:id", (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM subscription_form WHERE id = ?";

  db.query(sql, id, (error, results) => {
    if (error) {
      console.error("Error deleting subscription:", error);
      return res
        .status(500)
        .send("Error deleting the record: " + error.message);
    }
    if (results.affectedRows === 0) {
      return res.status(404).send("No subscription found with the given ID.");
    }
    res.send("Subscription deleted successfully.");
  });
});

//let messages = [];
//io.on('connection', (socket) => {
//  console.log('A client connected');
//
//  socket.emit('initial_messages', messages);
//  socket.on('new_message', (data) => {
//    messages.push(data);
//    io.emit('new_message', data);
//    const { email_address, message } = data;
//    const sql = 'INSERT INTO messages (email_address, message) VALUES (?, ?)';
//    db.query(sql, [email_address, message], (err, result) => {
//      if (err) throw err;
//      console.log('Message inserted into the database');
//    });
//  });
//
//  socket.on('disconnect', () => {
//    console.log('A client disconnected');
//  });
//});

app.get("/messages", (req, res) => {
  const sql = "SELECT * FROM messages";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching messages:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    res.status(200).json(results);
  });
});
//app.get('/messages/:id', (req, res) => {
//  const id = req.params.id;
//  const sql = 'SELECT * FROM messages WHERE id = ?';
//  db.query(sql, [id], (err, results) => {
//    if (err) {
//      console.error('Error fetching messages:', err);
//      return res.status(500).json({ error: 'Internal server error' });
//    }
//    res.status(200).json(results);
//  });
//});
//app.get("/CMessages", (req, res) => {
//  const sql = "SELECT * FROM messages WHERE email_address = ?";
//
//  db.query(sql, (err, results) => {
//    if (err) {
//      console.error("Error fetching messages:", err);
//      return res.status(500).json({ error: "Internal server error" });
//    }
//
//    res.status(200).json(results);
//  });
//});
app.get("/messages/:email_address", (req, res) => {
  const email_address = req.params.email_address;
  const sql = "SELECT * FROM messages WHERE email_address = ?";
  db.query(sql, [email_address], (err, results) => {
    if (err) {
      console.error("Error fetching messages:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.status(200).json(results);
  });
});

app.get("/Detail/:user_email", (req, res) => {
  const user_email = req.params.user_email;
  const sql = "SELECT * FROM messages WHERE email_address = ? AND admin_email = ?";
  db.query(sql, [user_email, 'info@mavensadvisor.com'], (err, results) => {
    if (err) {
      console.error("Error fetching messages:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.status(200).json(results);
  });
});

app.get("/CustomerMessages/:user_email", (req, res) => {
  const user_email = req.params.user_email;
  const sql = "SELECT * FROM messages WHERE email_address = ?";
  db.query(sql, [user_email, 'info@mavensadvisor.com'], (err, results) => {
    if (err) {
      console.error("Error fetching messages:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.status(200).json(results);
  });
});

app.get("/subscriptions", (req, res) => {
  const sql = "SELECT * FROM subscription_form";

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    res.status(200).json(results);
  });
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
module.exports = app;
