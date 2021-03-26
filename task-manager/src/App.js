import './App.css';
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import {useState, useEffect} from 'react'

function App() {

    const [showAddTask, setShowAddTask] = useState(false)
    const [tasks, setTasks] = useState([])
  

    useEffect(() => {
      const getTask = async () => {
        const taskFromServer = await fetchTasks()
        setTasks(taskFromServer)
      }  
      getTask()
    },[])

    //fetch all tasks
    const fetchTasks = async () => {
      const res = await fetch('http://localhost:5000/tasks')
      const data = await res.json()

      return data
    }

    //fetch single task
    const fetchTask = async (id) => {
      const res = await fetch(`http://localhost:5000/tasks/${id}`)
      const data = await res.json()

      return data
    }
    
    const deleteTask = async (id) => {
      await fetch(`
        http://localhost:5000/tasks/${id}`,
        {method: 'DELETE'}
      )
      setTasks(tasks.filter((task) => task.id !== id))
    }

    const toggleReminder = async (id) => {

      const taskToUpdate = await fetchTask(id)
      const updatedTask = {...taskToUpdate, reminder: !taskToUpdate.reminder}

      const res = await fetch(
        `http://localhost:5000/tasks/${id}`,
        {
          method:'PUT',
          headers:{
            'Content-type': 'application/json',
          },
          body:JSON.stringify(updatedTask)
        }
      )

      const data = await res.json()

      setTasks(tasks.map(task => task.id === id ? {...task, reminder: data.reminder} : task))
    }

    const onSubmit = async (task) => {
      
      const res = await fetch(
        `http://localhost:5000/tasks`,
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
      <h1>App Component</h1> 
      <Header addCloseButton={addCloseButton} showAddTask={showAddTask}/>
      {showAddTask?<AddTask onSubmit={onSubmit}/> :<></>}
      <Tasks tasks={tasks} toggleReminder={toggleReminder} deleteTask={deleteTask} />
    </div>
     );
}

export default App;
