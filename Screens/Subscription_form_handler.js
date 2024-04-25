//const express = require('express');
//const bodyParser = require('body-parser');
//const cors = require('cors');
//const server = require('./server');
//
//const app = express();
//const port = 8081;
//
//app.use(bodyParser.json());
//app.use(cors());
//
//app.post('/form', (req, res) => {
//  const {
//    business_description,
//    business_size,
//    business_category,
//    business_name,
//    firstName,
//    lastName,
//    email,
//    phone_no
//  } = req.body;
//
//  const sql = `INSERT INTO subscription_form
//    (business_description, business_size, business_category, business_name,
//    firstname, lastname, email, phone_no)
//    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
//
//    db.query(sql, [business_description, business_size, business_category,
//    business_name, firstName, lastName, email, phone_no], (err, result) => {
//
//    if (err) {
//      console.error('Error inserting data:', err);
//      return res.status(500).json({ error: 'Error inserting data' });
//    }
//    console.log('Data inserted successfully');
//    return res.status(200).json({ message: 'Data inserted successfully' });
//  });
//});
//
//app.listen(port, () => {
//  console.log(`Server listening at http://localhost:${port}`);
//});
//
//module.exports = app;
