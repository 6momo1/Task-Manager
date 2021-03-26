import { FaTimes } from 'react-icons/fa'

import React from 'react'
const Task = ({task, deleteTask, toggleReminder}) => {
    return (
        <div className={`task ${task.reminder ?'reminder':''}`} onDoubleClick={() => toggleReminder(task.id)}>
            <h3>
                {task.text} 
                <FaTimes onClick={() => deleteTask(task.id)} style={{color:'red', cursor:'pointer'}}/>
            </h3>
            <p>{task.day}</p>
        </div>
    )
}

export default Task
