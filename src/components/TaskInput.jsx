import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import TaskList from "./TaskList";

function TaskInput({ addTask, spanHandler,spanRemoved, tasksLength }) {
  const [taskInput, setTaskInput] = useState("");

  const handleTaskInput = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setTaskInput(value);
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const task = { id: Date.now(), title: taskInput, completed: false };
    if(task.title !== "" && task.title.length>3){
    addTask(task);
    }
    setTaskInput("");
  };

  return (
    <div>
      <h2 className="text-center fw-bolder m-2">Todo List</h2>
      <form className="form-control d-flex  justify-content-between shadow border border-0 border-bottom">
        <input
          type="checkbox"
          className="form-check-input rounded-5 align-self-center me-2 "
          disabled
        />
        <input 
          onChange={handleTaskInput}
          type="text"
          placeholder="Create a new task"
          className="form-control border border-0 shadow-none"
          value={taskInput}
        />

        <button
          onClick={handleSubmit}
          type="submit"
          className="btn border border-0"
        >
          <FaPlus />
        </button>
      </form>
    </div>
  );
} 

export default TaskInput;
