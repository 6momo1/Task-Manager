const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const  bitToBoolean  = require("./pipes/bitToBoolean")
const  booleanToBit  = require("./pipes/booleanToBit")


//middleware
app.use(cors());
app.use(express.json()); //req.body




// schema: { text, day, reminder }



// POST A TASK
app.post("/tasks", async (req, res) => {
  try {
    const { text } = req.body;
    const { day } = req.body;
    const { reminder } = req.body;
    const newTasks = await pool.query(
      "INSERT INTO tasks (text, day, reminder) VALUES($1,$2,$3) RETURNING *",
      [text,day,reminder]
    );

    res.json(newTasks.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});






//GET ALL TASKS
app.get("/tasks", async (req, res) => {
  try {
    const allTasks = await pool.query("SELECT * FROM tasks");
    res.json(allTasks.rows);
  } catch (err) {
    console.error(err.message);
  }
});





// GET A SINGLE TASK
app.get("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const task = await pool.query("SELECT * FROM tasks WHERE id = $1", [
      id
    ]);

    res.json(task.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});




// PUT: Edit a single reminder
app.put("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { reminder } = req.body;
    const updateTodo = await pool.query(
      "UPDATE tasks SET reminder = $1 WHERE id = $2",
      [reminder, id]
    );

    const allTasks = await pool.query("SELECT * FROM tasks");

    res.json(allTasks.rows[0]);
    
  } catch (err) {
    console.error(err.message);
  }
});



// DELETE a single task

app.delete("/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTask = await pool.query("DELETE FROM tasks WHERE id = $1", [
      id
    ]);
    res.json("Task deleted.");
  } catch (err) {
    console.log(err.message);
  }
});

app.listen(5000, () => {
  console.log("server has started on port 5000");
});