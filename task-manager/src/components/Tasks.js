import React from 'react'


const Tasks = ({tasks}) => {
    
    return (
        <div>
            {tasks.map( task =>(
                <h3 id={task.id}>{task.text}</h3>
            ))}
        </div>
    )
}

export default Tasks
