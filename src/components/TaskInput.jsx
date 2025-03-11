import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import TaskList from "./TaskList";
import { VscGlobe } from "react-icons/vsc";

function TaskInput({
  addTask,
  spanHandler,
  spanRemoved,
  tasksLength,
  setTask,
}) {
  const [taskInput, setTaskInput] = useState("");

  const handleTaskInput = async (e) => {
    e.preventDefault();
    const value = e.target.value;
    setTaskInput(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const task = { id: Date.now(), title: taskInput, completed: false };
    
    if (task.title !== "" && task.title.length > 3) {
      //addTask(task);
    }
    
    const apiTask = {
      user_id: 12,
      title: taskInput,
      completed: false,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(apiTask),
    };
  
    
    try {
      const response = await fetch(
        "http://yollstudentapi.com/api/todos",
        options
      );
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      // fetch of new tasks so we update the state
    } catch (err) {
      console.log(err);
    }
    
    // cretae another try catch and fetch the tasks /
    // after set the result of fetch to the app state via setTask setter method
    try {
      const response = await fetch("http://yollstudentapi.com/api/todos?user_id=12");
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      // fetch of new tasks so we update the state
      setTask(data);
    } catch (err) {
      console.log(err);
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
