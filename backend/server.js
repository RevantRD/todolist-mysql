const express = require("express");
const app = express();
const mysql = require("mysql");

const cors = require("cors");
app.use(express.json());

app.use(cors());
const PORT = 5000;

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "todolist",
});

conn.connect((err) => {
  if (err) {
    console.log(error);
  }
  console.log(`Connecting to database successful`);
});
//Retriving data from the database
app.get("/get", (req, res) => {
  const query = "select * from todo";
  conn.query(query, (error, result) => {
    if (error) {
      console.log(error);
      res.status(400).json({ error: "Error While retrieving the data" });
    }
    console.log(result);
    res.status(200).json(result);
  });
});
//Inserting data into the database
app.post("/add", (req, res) => {
  const { task } = req.body;
  const query = "insert into todo(task) values(?)";
  conn.query(query, [task], (error, result) => {
    if (error) {
      console.log(error);
      res.status(503).json({ error: "Error while inserting data" });
    }
    console.log(result);
    res.status(201).json("Task added successfully");
  });
});

app.delete("/:id", (req, res) => {
  const query = `delete from todo where id=${req.params.id}`;
  conn.query(query, (error, result) => {
    if (error) {
      console.log(error);
      req.json("Error deleting data");
    }
    console.log("Task deleted successfully");
    res.json("Task deleted successfully");
  });
});

app.listen(PORT, () => {
  console.log(`Server started on PORT: ${PORT}`);
});
