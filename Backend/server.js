const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const server = require('./server');
const bcrypt = require('bcrypt');

const app = express();
const port = 8080;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mavens_advisor'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.use(bodyParser.json());
app.use(cors());

app.post('/api', (req, res) => {
  const {
    business_description,
    business_size,
    business_category,
    business_name,
    firstName,
    lastName,
    email,
    phone_no
  } = req.body;
  const sql = `INSERT INTO subscription_form
    (business_description, business_size, business_category, business_name,
    firstname, lastname, email, phone_no)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(sql, [business_description, business_size, business_category,
    business_name, firstName, lastName, email, phone_no], (err, result) => {

    if (err) {
      console.error('Error inserting data:', err);
      return res.status(500).json({ error: 'Error inserting data' });
    }
    console.log('Data inserted successfully');
    return res.status(200).json({ message: 'Data inserted successfully' });
  });
});

app.post('/login', (req, res) => {
  const { email_address, password } = req.body;

  const sql = 'SELECT * FROM user WHERE email_address = ?';
  db.query(sql, [email_address], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (results.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = results[0];
    bcrypt.compare(password, user.password, (bcryptErr, bcryptResult) => {
      if (bcryptErr) {
        console.error('Error comparing passwords:', bcryptErr);
        return res.status(500).json({ error: 'Internal server error' });
      }

      if (!bcryptResult) {
        return res.status(401).json({ error: 'Invalid email or password' });
      }

      return res.status(200).json({ message: 'Login successful' });
    });
  });
});

app.post('/contactData', (req, res) => {
  const { full_name, email_address, message } = req.body;

  const query = 'INSERT INTO contact_form (full_name, email_address, message) VALUES (?, ?, ?)';
  db.query(query, [full_name, email_address, message], (err, result) => {
    if (err) {
      console.error('Error inserting contact data:', err);
      res.status(500).json({ error: 'Failed to submit contact form' });
      return;
    }
    console.log('Contact form submitted successfully');
    res.status(200).json({ message: 'Contact form submitted successfully' });
  });
});

app.get('/subscription_form/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'SELECT * FROM subscription_form WHERE id = ?';

  db.query(sql, id, (error, results) => {
    if (error) {
      console.error('Error fetching subscription details:', error);
      return res.status(500).send('Error fetching subscription details: ' + error.message);
    }
    if (results.length === 0) {
      return res.status(404).send('No subscription found with the given ID.');
    }
    const subscriptionDetails = results[0]; // Assuming there's only one row for each subscription
    res.json(subscriptionDetails);
  });
});

app.post('/signup', (req, res) => {
  const { email_address, user_name, password, confirm_password } = req.body;

  if (password !== confirm_password) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }

  bcrypt.hash(password, 10, (hashErr, hashedPassword) => {
    if (hashErr) {
      console.error('Error hashing password:', hashErr);
      return res.status(500).json({ error: 'Error hashing password' });
    }

    const sql = 'INSERT INTO user (email_address, user_name, password) VALUES (?, ?, ?)';
    db.query(sql, [email_address, user_name, hashedPassword], (err, result) => {
      if (err) {
        console.error('Error inserting user data:', err);
        return res.status(500).json({ error: 'Error inserting user data' });
      }
      console.log('User data inserted successfully');
      return res.status(201).json({ message: 'User created successfully' });
    });
  });
});

app.delete('/subscriptions/:id', (req, res) => {
  const { id } = req.params;
  const sql = 'DELETE FROM subscription_form WHERE id = ?';

  db.query(sql, id, (error, results) => {
    if (error) {
      console.error('Error deleting subscription:', error);
      return res.status(500).send('Error deleting the record: ' + error.message);
    }
    if (results.affectedRows === 0) {
      return res.status(404).send('No subscription found with the given ID.');
    }
    res.send('Subscription deleted successfully.');
  });
});


app.get('/subscriptions', (req, res) => {
  const sql = 'SELECT * FROM subscription_form';

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    res.status(200).json(results);
  });
});

app.listen(port, () => {
console.log(`Server listening at http://localhost:${port}`);
});
module.exports = app;