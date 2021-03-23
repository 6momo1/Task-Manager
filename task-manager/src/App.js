import './App.css';
import Header from './components/Header'
import Tasks from './components/Tasks'
import {useState} from 'react'

function App() {

  const [tasks, setTasks] = useState(
        [
            {
                id:1,
                text: "Text 1",
                day: "Feb 5th",
                reminder: true,
            },
            {
                id:2,
                text: "Text 2",
                day: "August 14th",
                reminder: true,
            },
            {
                id:3,
                text: "Text 3",
                day: "March 5th",
                reminder: true,
            }
        ]
    )
  
    
    const deleteTask = (id) => {
      setTasks(tasks.filter((task) => task.id !== id))
    }

    const toggleReminder = (id) => {
      setTasks(tasks.map(task => task.id === id ? {...task, reminder: !task.reminder} : task))
    }

  return (
    <div className='container'>
      <h1>App Component</h1> 
      <Header />
      <Tasks tasks={tasks} toggleReminder={toggleReminder} deleteTask={deleteTask} />
    </div>
     );
}

export default App;
