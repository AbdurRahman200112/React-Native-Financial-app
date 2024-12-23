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

app.post('/teachers', (req, res) => {
  const { name, email, password, department } = req.body;

  // Insert into users table
  const userQuery = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, "teacher")';
  db.query(userQuery, [name, email, password], (err, userResult) => {
    if (err) {
      console.error('Error inserting into users table:', err.message);
      return res.status(500).json({ error: 'Failed to create user' });
    }

    // Insert into teachers table
    const teacherQuery = 'INSERT INTO teachers (user_id, department) VALUES (?, ?)';
    db.query(teacherQuery, [userResult.insertId, department], (err, teacherResult) => {
      if (err) {
        console.error('Error inserting into teachers table:', err.message);
        return res.status(500).json({ error: 'Failed to create teacher' });
      }

      res.status(201).json({ message: 'Teacher account created successfully' });
    });
  });
});

app.post('/students', (req, res) => {
  const { name, email, password, enrollment_no, department } = req.body;

  // Validate input
  if (!name || !email || !password || !enrollment_no || !department) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Insert into `users` table
  const userQuery = 'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, "student")';
  db.query(userQuery, [name, email, password], (err, userResult) => {
    if (err) {
      console.error('Error inserting into users table:', err.message);
      return res.status(500).json({ error: 'Failed to create user' });
    }

    const userId = userResult.insertId; // Get the auto-generated `user_id`

    // Insert into `students` table
    const studentQuery = 'INSERT INTO students (user_id, enrollment_no, department) VALUES (?, ?, ?)';
    db.query(studentQuery, [userId, enrollment_no, department], (err, studentResult) => {
      if (err) {
        console.error('Error inserting into students table:', err.message);
        return res.status(500).json({ error: 'Failed to create student' });
      }

      res.status(201).json({
        message: 'Student account created successfully',
        user_id: userId,
        student_id: studentResult.insertId, // Optional: Return the student table's ID
      });
    });
  });
});


app.get("/ShowTeachers", (req, res) => {
  const query = "SELECT id, name FROM users WHERE role='teacher'"; // Fetching teachers with their id and name
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching teachers:", err);
      return res.status(500).json({ error: "Database error" });
    }
    res.json({ teachers: results });
  });
});

app.get('/ShowStudents', (req, res) => {
  const query = "SELECT id, name FROM users WHERE role = 'student'";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching students:", err);
      return res.status(500).json({ error: "Failed to fetch students." });
    }
    res.status(200).json({ students: results });
  });
});

app.post("/api/RegisterStudent", async (req, res) => {
  const {
    name,
    term,
    cgpa,
    credit_earned,
    credit_remaining,
    outstanding_dues,
    degree_progress,
    email,
    password,
  } = req.body;

  // Check required fields
  if (!name || !term || !email || !password) {
    return res.status(400).json({ error: "Missing required fields!" });
  }

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds = 10

    // Insert student record
    const query = `
      INSERT INTO student (name, term, cgpa, credit_earned, credit_remaining, outstanding_dues, degree_progress, email, password)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(
      query,
      [
        name,
        term,
        cgpa || 0.0,
        credit_earned || 0,
        credit_remaining || 0,
        outstanding_dues || 0.0,
        degree_progress || 0.0,
        email,
        hashedPassword,
      ],
      (err, result) => {
        if (err) {
          console.error(err.message);
          res.status(500).json({ error: "Database error. Please try again!" });
        } else {
          res.status(200).json({ message: "Student record inserted successfully!" });
        }
      }
    );
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Error hashing password!" });
  }
});

app.post("/api/student/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and Password are required" });
  }

  const query = "SELECT * FROM student WHERE email = ?";
  db.query(query, [email], async (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    if (results.length > 0) {
      const student = results[0];
      const isPasswordValid = await bcrypt.compare(password, student.password);
      if (isPasswordValid) {
        return res.status(200).json({ message: "Student login successful!", student });
      } else {
        return res.status(401).json({ error: "Invalid student credentials" });
      }
    } else {
      return res.status(404).json({ error: "Student not found" });
    }
  });
});

app.get("/api/student/data", (req, res) => {
  const studentId = req.params.id;
  const query = `
    SELECT cgpa, credit_earned, credit_remaining, outstanding_dues, degree_progress
    FROM student
    WHERE student_id = 4`;

  db.query(query, [studentId], (err, result) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: "Database error" });
    }

    if (result.length > 0) {
      res.status(200).json(result[0]);
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  });
});
app.get("/api/advisors", (req, res) => {
  const query = "SELECT advisor_id, advisor_name FROM advisors";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
});

// Endpoint to insert project group
app.get("/api/projectGroups", (req, res) => {
  const query = `
    SELECT
      pg.group_title,
      pg.group_members,
      a.advisor_name
    FROM
      project_groups pg
    JOIN
      advisors a
    ON
      pg.advisor_id = a.advisor_id;
`;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ error: err.message });
    }
    console.log("Query Results:", results);
    res.status(200).json(results);
  });
});

app.get("/api/getCourses", (req, res) => {
  const query = "SELECT id, course_name FROM courses";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
});


app.post("/api/getTeacherByCourse", (req, res) => {
  const { courseId } = req.body;
  if (!courseId) {
    return res.status(400).json({ error: "Course ID is required" });
  }

  const query = `
    SELECT t.teacher_name, c.course_name
    FROM courses c
    JOIN teachers t ON c.teacher_id = t.id
    WHERE c.id = ?;
  `;

  db.query(query, [courseId], (err, results) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results[0]);
  });
});


app.post("/api/addTeacherSelection", (req, res) => {
  const { courseId, courseName, teacherName } = req.body;

  if (!courseId || !courseName || !teacherName) {
    return res.status(400).json({
      error: "Course ID, Course Name, and Teacher Name are required",
    });
  }

  const query = `
    INSERT INTO selected_teachers (course_id, course_name, teacher_name)
    VALUES (?, ?, ?);
  `;

  db.query(query, [courseId, courseName, teacherName], (err, result) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json({ message: "Teacher selection added successfully!" });
  });
});



app.get("/api/projectGroups", (req, res) => {
  const query = `
    SELECT pg.group_title, pg.group_members, a.advisor_name
    FROM project_groups pg
    JOIN advisors a ON pg.advisor_id = a.advisor_id`;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
});

app.get("/api/transcript/data", (req, res) => {
  const student_id = req.params.student_id;
  const query = `
    SELECT term, course_code, course_name, credit_hours, grade, gpa
    FROM transcript
    WHERE student_id = 4
    ORDER BY term`;

  db.query(query, [student_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
});

app.get("/api/getSelectedTeachers", (req, res) => {
  const query = `
    SELECT st.course_id, st.course_name, st.teacher_name, c.course_code
    FROM selected_teachers st
    JOIN courses c ON st.course_id = c.id;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).json({ error: err.message });
    }
    res.status(200).json(results);
  });
});



app.get("/ShowCourses", (req, res) => {
  db.query("SELECT id, course_name FROM courses", (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error fetching courses");
    }
    res.json({ courses: results });
  });
});
app.post('/StudentRegister', async (req, res) => {
  const { student_id, course_id } = req.body;

  try {
    const [studentExists] = await db.query('SELECT id FROM students WHERE id = ?', [student_id]);
    const [courseExists] = await db.query('SELECT id FROM courses WHERE id = ?', [course_id]);

    if (!studentExists.length || !courseExists.length) {
      return res.status(400).json({ error: "Invalid student or course ID." });
    }

    await db.query('INSERT INTO student_courses (student_id, course_id) VALUES (?, ?)', [student_id, course_id]);
    res.json({ message: "Student registered successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database error" });
  }
});

//app.post('/StudentRegister', async (req, res) => {
//  const { student_id, course_id } = req.body;
//
//  // Validate input
//  if (!student_id || !course_id) {
//    return res.status(400).json({ error: 'Student ID and Course ID are required' });
//  }
//
//  try {
//    // Check if student exists
//const studentExistsQuery = "SELECT id FROM users WHERE id = ? AND role = 'student'";
//const courseExistsQuery = "SELECT id FROM courses WHERE id = ?";
//
//
//    const studentResults = await new Promise((resolve, reject) => {
//      db.query(studentExistsQuery, [student_id], (err, results) => {
//        if (err) return reject(err);
//        resolve(results);
//      });
//    });
//
//    if (studentResults.length === 0) {
//      return res.status(400).json({ error: 'Student does not exist' });
//    }
//
//    const courseResults = await new Promise((resolve, reject) => {
//      db.query(courseExistsQuery, [course_id], (err, results) => {
//        if (err) return reject(err);
//        resolve(results);
//      });
//    });
//
//    if (courseResults.length === 0) {
//      return res.status(400).json({ error: 'Course does not exist' });
//    }
//
//    // Insert into student_courses
//    const insertQuery = "INSERT INTO student_courses (student_id, course_id) VALUES (?, ?)";
//    db.query(insertQuery, [student_id, course_id], (err, result) => {
//      if (err) {
//        console.error("Database error registering student to course:", err);
//        return res.status(500).json({ error: 'Database error registering student to course' });
//      }
//      res.status(201).json({ message: 'Student registered successfully' });
//    });
//  } catch (err) {
//    console.error("Error processing request:", err);
//    res.status(500).json({ error: 'Server error' });
//  }
//});

app.post("/courses/add", (req, res) => {
  const { course_code, course_name, teacher_id, credit } = req.body;

  // Input validation
  if (!course_code || !course_name || !teacher_id || !credit) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const query = `INSERT INTO courses (course_code, course_name, teacher_id, credit) VALUES (?, ?, ?, ?)`;

  db.query(query, [course_code, course_name, teacher_id, credit], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Error adding course", error: err });
    }
    return res.status(201).json({ message: "Course added successfully", course: results });
  });
});
// Endpoint to assign a teacher
app.post("/assign-teacher", (req, res) => {
  const { teacherId } = req.body;

  // Perform necessary operations (e.g., saving to a database)
  const query = "SELECT * FROM teachers WHERE id = ?";
  db.query(query, [teacherId], (err, results) => {
    if (err) {
      console.error("Error fetching teacher:", err);
      return res.status(500).json({ error: "Database error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "Teacher not found" });
    }

    res.json({ message: `Teacher ${results[0].name} assigned successfully` });
  });
});


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
app.get("/api/student/attendance", (req, res) => {
  const student_id = req.params.id;
  const query = `
    SELECT course_code, course_name, total_lectures, total_absents, lecture_date, status
    FROM Attendance
    WHERE student_id = 4;
  `;
  db.query(query, [student_id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
});

app.get("/api/program-courses", (req, res) => {
  const query = "SELECT * FROM ProgramCourses ORDER BY semester ASC";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
});

app.get("/api/academic-calendar", (req, res) => {
  const query = "SELECT * FROM AcademicCalendar ORDER BY serial_no ASC";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
});
app.get("/api/fee-challan", (req, res) => {
  const query = "SELECT * FROM FeeChallan ORDER BY installment_number ASC";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
});
app.get("/api/timetable", (req, res) => {
  const query = "SELECT * FROM Timetable ORDER BY FIELD(day, 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN')";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(200).json(results);
  });
});
app.get("/api/academic-deadlines", (req, res) => {
  const query = "SELECT * FROM academic_deadlines ORDER BY serial_no";
  db.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
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