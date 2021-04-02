import './App.css';
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import {useState, useEffect} from 'react'

const  bitToBoolean  = require("./pipes/bitToBoolean")
const  booleanToBit  = require("./pipes/booleanToBit")

const LOCALHOST = '192.168.0.20'
const PORT = '5000'

function App() {

    const [showAddTask, setShowAddTask] = useState(true)
    const [tasks, setTasks] = useState([])
  

    useEffect(() => {
      const getTask = async () => {
        const taskFromServer = await fetchTasks()
        setTasks(taskFromServer)
      }  
      getTask()
    },[])

    //GET ALL TASKS
    const fetchTasks = async () => {
      const res = await fetch(`http://${LOCALHOST}:${PORT}/tasks`)
      const data = await res.json()
      console.log(data);
      data.map( task => task.reminder = bitToBoolean(task.reminder)) 
      console.log(data);
      return data
    }

    //GET TASK
    const fetchTask = async (id) => {
      const res = await fetch(`http://${LOCALHOST}:${PORT}/tasks/${id}`)
      const data = await res.json()

      return data
    }
   
    //DELETE TASK
    const deleteTask = async (id) => {
      await fetch(`
        http://${LOCALHOST}:${PORT}/tasks/${id}`,
        {method: 'DELETE'}
      )
      setTasks(tasks.filter((task) => task.id !== id))
    }

    //PUT: TOGGLE REMINDER
    const toggleReminder = async (id) => {

      const taskToUpdate = await fetchTask(id)  // return a reminder with a bit
      const bitBefore = bitToBoolean(taskToUpdate.reminder) // convert reminder to boolean
      const updatedTask = {...taskToUpdate, reminder: !bitBefore}

      var bit = 0
      if (bitBefore){
        bit = 0
      } else {
        bit = 1
      }
      const res = await fetch(
        `http://${LOCALHOST}:${PORT}/tasks/${id}`,
        {
          method:'PUT',
          headers:{
            'Content-type': 'application/json',
          },
          body:JSON.stringify({...updatedTask,reminder:bit})
        }
      )
      
      // const data = await res.json()
      setTasks(tasks.map(task => task.id === id ? {...task, reminder: updatedTask.reminder} : task ))

    }

    //POST TASK
    const onSubmit = async (task) => {
      const bit = booleanToBit(task.reminder)
      task = {...task, reminder: bit}
      const res = await fetch(
        `http://${LOCALHOST}:${PORT}/tasks`,
        {
          method: 'POST',
          headers: {
            'Content-type':'application/json',
          },
          body: JSON.stringify(task)
        }
      )

      const data = await res.json()
      setTasks([...tasks,data])

      // const id = Math.floor(Math.random()*1000) + 1
      // const newTask = {id,...task}
      // setTasks([...tasks, newTask])
    }



    const addCloseButton = () => {
      console.log("add close button received");
      setShowAddTask(!showAddTask)
    }

  return (
    <div className='container'>
      <Header addCloseButton={addCloseButton} showAddTask={showAddTask}/>
      {showAddTask?<AddTask onSubmit={onSubmit}/> :<></>}
      <Tasks tasks={tasks} toggleReminder={toggleReminder} deleteTask={deleteTask} />
    </div>
     );
}

export default App;