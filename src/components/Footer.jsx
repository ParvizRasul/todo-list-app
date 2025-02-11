import React from 'react'
import App from '../App'
import TaskCard from './TaskCard'

function Footer({handleClearCompleted, handleActive, handleCompleted, buttonActive, tasks, handleAllButton, filterTasks}) {
  return (
    <div className='card-footer d-flex justify-content-between align-items-center shadow px-2'>
        <div className='ms-2'>
           <span>{filterTasks().length} task left</span>
        </div>
      <div className=''>
        <button onClick={handleAllButton} className='btn btn-sm border border-0 '>All</button>
        <button onClick={handleActive} className={`btn btn-sm border border-0 ${buttonActive ? ' active text-decoration-underline' : ''}`}>Active</button>
        <button onClick={handleCompleted} className={`btn btn-sm border border-0 ${buttonActive ? ' active text-decoration-underline' : ''}`}>Completed</button>
        
      </div>
      <div>
        <button onClick={handleActive } className={`btn btn-sm border border-0 ${buttonActive ? 'active text-decoration-underline' : ''}`}>Clear Completed</button>
      </div>

    </div>
  )
}

export default Footer

