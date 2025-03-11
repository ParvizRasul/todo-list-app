import React, { useState } from "react";
import TaskCard from "./TaskCard.jsx";
import TaskInput from "./TaskInput.jsx";
import App from "../App.jsx";
import Footer from "./Footer.jsx";

function TaskList({
  task,
  tasks,
  removeTask,
  crossOverTask,
  handleClearCompleted,
  handleActive,
  spanHandler,
  spanRemoved,
  filterTasks,
  deleteTaskApi,
  fetchTasks
}) {
  return (
    <div>
      <ul className="list-unstyled">
        {tasks.length === 0 ? (<div className="d-flex flex-column align-items-center shadow">No tasks yet</div>) : (filterTasks().map((task) => (
          <li key={task.id}>
            <TaskCard
              task={task}
              removeTask={removeTask}
              crossOverTask={crossOverTask}
              handleClearCompleted={handleClearCompleted}
              handleActive={handleActive}
              spanHandler={spanHandler}
              spanRemoved={spanRemoved}
              deleteTaskApi={deleteTaskApi}
              fetchTasks={fetchTasks}
            />
          </li>
        )))}
      </ul>
    </div>
  );
}

export default TaskList;
