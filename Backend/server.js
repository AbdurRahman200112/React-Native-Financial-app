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


app.post('/api', (req, res) => {
  const formData = req.body;

  db.query('INSERT INTO subscription_form SET ?', formData, (error, results, fields) => {
    if (error) {
      console.error('Error inserting form data:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    console.log('Form data inserted successfully');
    res.status(200).json({ message: 'Form data saved successfully' });
  });
});


app.post('/LockedPrices/message', (req, res) => {
  const {
    email_address,
    message
  } = req.body;

  const sql = 'INSERT INTO messages (email_address, message) VALUES (?, ?)';
  db.query(sql, [email_address, message], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ error: 'Error inserting data' });
    }
    console.log('Data inserted successfully');
    return res.status(200).json({ message: 'Data inserted successfully' });
  });
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

// API endpoint to fetch messages by email address
app.get('/messages/:email_address', (req, res) => {
  const email_address = req.params.email_address;
  const sql = 'SELECT * FROM messages WHERE email_address = ?';

  db.query(sql, [email_address], (err, results) => {
    if (err) {
      console.error('Error fetching data from MySQL database:', err);
      res.status(500).send('Server error');
      return;
    }
    res.status(200).json(results);
  });
});

app.post('/new_message', (req, res) => {
  const { email_address, admin_email, message } = req.body;
  const sql = 'INSERT INTO messages (email_address, admin_email, message) VALUES (?, ?, ?)';

  db.query(sql, [email_address, admin_email, message], (err, result) => {
    if (err) {
      console.error('Error inserting data into MySQL database:', err);
      res.status(500).send('Server error');
      return;
    }
    const newMessage = {
      email_address,
      admin_email,
      message,
      timestamp: new Date()
    };
    io.emit('newMessage', newMessage);
    res.status(200).send('Message inserted successfully');
  });
});
app.post("/Customer/new_message", (req, res) => {
  const { email_address, message } = req.body;

  const sql =
    "INSERT INTO messages (email_address, message) VALUES (?, ?)";
  db.query(sql, [email_address, message], (err, result) => {
    if (err) {
      console.error("Error inserting data:", err);
      return res.status(500).json({ error: "Error inserting data" });
    }
    console.log("Data inserted successfully");
    return res.status(200).json({ message: "Data inserted successfully" });
  });
});

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
app.get('/contactForm', (req, res) => {
  const sql = 'SELECT * FROM contact_form';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching data from MySQL database:', err);
      res.status(500).send('Server error');
      return;
    }
    res.status(200).json(results);
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
app.get("/Detail/:user_email", (req, res) => {
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