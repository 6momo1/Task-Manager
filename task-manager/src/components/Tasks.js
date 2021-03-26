import React from 'react'
import Task from './Task'

const Tasks = ({tasks, deleteTask, toggleReminder}) => {
    return (
        <div>
            {tasks.map( (task, index) => (
                <Task key={index} task={task} deleteTask={deleteTask} toggleReminder={toggleReminder}/>
            ))}
        </div>
    )
}

export default Tasks
