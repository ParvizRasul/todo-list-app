import React from 'react'
import { FaTrashCan } from "react-icons/fa6";
import TaskList from './TaskList';
import TaskInput from './TaskInput';
import App from '../App';



function TaskCard({task, removeTask, crossOverTask, handleClearComplete, handleActive}) {

  
const checkbox = false;

  return (
    <div>
        <div className='d-flex justify-content-between shadow mt-1 p-1'>
            <div className='d-flex mt-2 '>
            <input onChange={()=>crossOverTask(task.id)} type="checkbox" name="checkbox" checked={task.completed} className='form-check-input rounded-5 ms-2' />
            <h5
              className={`ms-2 ${task.completed ? 'text-decoration-line-through' : ''}`}
            >
              {task.title}
            </h5>
            </div>
          <button onClick={()=> removeTask(task.id)} className='btn '><FaTrashCan/></button>
          </div>
   
       
        
    </div>
  )
}

export default TaskCard

 