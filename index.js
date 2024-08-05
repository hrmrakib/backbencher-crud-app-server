const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

// Create a MySQL connection
const bd = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "crud",
});

// Connect to MySQL
bd.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL");
});

app.get("/", async (req, res) => {
  res.send("hello");
});

app.listen(port, () => {
  console.log(`Server is on: ${port}`);
});
