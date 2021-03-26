import React from 'react'
import { useState } from 'react'


const AddTask = ({onSubmit}) => {

    const [text, setText] = useState('')
    const [day, setDay] = useState('')
    const [reminder, setReminder] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        if(text === ''){
            alert("Please enter a task.")
            return
        }
        setText('')
        setDay('')
        setReminder(false)
        onSubmit({text,day,reminder})
    }

    return (
        <form className='add-form' onSubmit={handleSubmit}>
           <div className='form-control'>
                <label>Task</label>
                <input 
                    value={text}
                    type='text' 
                    placeholder='Add Task'
                    onChange={(e) => {setText(e.target.value)}}/>
            </div>
            <div className='form-control'>
                <label>Day and Time</label>
                <input 
                    value={day}
                    type='text' 
                    placeholder='Day and Time'
                    onChange={(e) => {setDay(e.target.value)}}/>
            </div>
            <div>
                <label>Set Reminder</label>
                <input 
                type='checkbox'
                checked={reminder}
                value={reminder}
                onChange={(e) => {setReminder(e.currentTarget.checked)}}/>
            </div>
            <input 
                value="Save Task" 
                type="submit" 
                className='btn btn-block'/>
        </form>
    )
}

export default AddTask
