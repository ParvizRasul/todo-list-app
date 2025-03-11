import React from "react";
import { FaTrashCan } from "react-icons/fa6";
import TaskList from "./TaskList";
import TaskInput from "./TaskInput";
import App from "../App";

function TaskCard({
  task,
  removeTask,
  crossOverTask,
  handleClearComplete,
  handleActive,
  fetchTasks,
}) {
  const checkbox = false;

  const deleteTaskApi = async () => {
    try {
      console.log("delete started");
      const deleteResponse = await fetch(
        `http://yollstudentapi.com/api/todos/${task.id}?user_id=12`,
        { method: "DELETE" }
      );
      const data = await deleteResponse.json();
      console.log(data);
      if (!deleteResponse.ok) {
        throw new Error(deleteResponse.statusText);
      }

      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  // const updateTaskApi = async () => {
  //   const response = await fetchTasks();
  //   console.log(response);
  //   const data = await response.json();
  // };

  return (
    <div>
      <div className="d-flex justify-content-between shadow mt-1 p-1">
        <div className="d-flex mt-2 ">
          <input
            onChange={() => crossOverTask(task)} // 340 , {id: 340, title: jdksjhfbd, completed: true}
            type="checkbox"
            name="checkbox"
            checked={task.completed}
            className="form-check-input rounded-5 ms-2"
          />
          <h5
            className={`ms-2 ${
              task.completed ? "text-decoration-line-through" : ""
            }`}
          >
            {task.title}
          </h5>
        </div>
        <button onClick={() => deleteTaskApi(task.id)} className="btn ">
          <FaTrashCan />
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
