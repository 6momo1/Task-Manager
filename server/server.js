const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const path = require('path')

const  bitToBoolean  = require("./pipes/bitToBoolean")
const  booleanToBit  = require("./pipes/booleanToBit")


const LOCALNETWORK = '192.168.0.20'
const PORT = 5000

//middleware
app.use(cors());
app.use(express.json()); //req.body, allow express to read json


app.use(express.static(path.join(__dirname,'build')))

app.get('/', function(req,res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})




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

    console.log("Task added.", req.body);

  } catch (err) {
    console.error(err.message);
  }
});




//GET ALL TASKS
app.get("/tasks", async (req, res) => {
  try {
    const allTasks = await pool.query("SELECT * FROM tasks");
    
    res.json(allTasks.rows);

    console.log("All tasks returned.");

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

    console.log("Single task returned",task);

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

    console.log(`Task id of ${id} updated.`);

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

    console.log(`Task id:${id} deleted.`);

  } catch (err) {
    console.log(err.message);
  }
});

app.listen(PORT, LOCALNETWORK, () => {
  console.log(`Server running on network ${LOCALNETWORK}, listening on port:${PORT}`);
});

