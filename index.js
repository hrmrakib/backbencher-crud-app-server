const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const app = express();
const port = 5000;

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://backbencher-crud-app.vercel.app",
    ],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());
app.use(bodyParser.json());

// Create a MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud_app",
});

// Connect to MySQL
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});

// default for base path
app.get("/", (req, res) => {
  res.send("Hello, I am on with mysql db ....");
});

// create a new user
app.post("/create", (req, res) => {
  const { userName, userEmail } = req.body;

  // firstly, check email already existed
  const isEmailExist = "SELECT * FROM users WHERE email = ?";

  db.query(isEmailExist, [userEmail], (err, result) => {
    if (err) {
      return res.send({ message: "Database Query error!" });
    }

    if (result.length > 0) {
      return res.send({ isExist: true });
    } else {
      // now create a new user
      const sql = "INSERT INTO users (name, email) VALUES (?, ?)";

      db.query(sql, [userName, userEmail], (err, data) => {
        if (err) {
          return res.send(err);
        }
        return res.send({ message: "success" });
      });
    }
  });
});

// get all users
app.get("/users", (req, res) => {
  const sql = "SELECT * FROM users";

  db.query(sql, (err, data) => {
    if (err) {
      return res.send("Something wrong happened!");
    }
    return res.send(data);
  });
});

app.put("/update/:userEmail", (req, res) => {
  const { userEmail } = req.params;
  const { onChangeUpdateName: name, onChangeUpdateEmail: email } = req.body;

  const sql = "UPDATE users SET name = ?, email = ? WHERE email = ?";
  db.query(sql, [name, email, userEmail], (err, result) => {
    if (err) {
      return res.send({ error: "Database query error!" }, err);
    }
    return res.send({ message: "success" });
  });
});

// delete a user
app.delete("/delete/:email", (req, res) => {
  const { email } = req.params;
  const sql = "DELETE FROM users WHERE email = ?";

  db.query(sql, [email], (err, result) => {
    if (err) {
      return res.send({ message: "Server error!" });
    }
    return res.send(result);
  });
});

app.listen(port, () => {
  console.log(`Server is on: ${port}`);
});
