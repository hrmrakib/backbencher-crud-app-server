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

app.get("/users", async (req, res) => {
  const sql = "SELECT * FROM users";

  db.query(sql, (err, data) => {
    if (err) {
      return res.send("Something wrong happened!");
    }

    return res.send(data);
  });

  // res.send("hello - express + mysql");
});

app.listen(port, () => {
  console.log(`Server is on: ${port}`);
});
