import { useState } from "react";
import Footer from "./components/Footer.jsx";
import TaskInput from "./components/TaskInput.jsx";
import TaskList from "./components/TaskList.jsx";
import TaskCard from "./components/TaskCard.jsx";

function App({ task }) {
  const [tasks, setTasks] = useState([]);
  const [crossed, setCrossed] = useState("");
  const [spanRemoved, setSpanRemoved] = useState("d-active");
  const [filter, setFilter] = useState("all");

  

  const addTask = (newtask) => {
    setTasks((prev) => [...tasks, { ...newtask, completed: false }]);
    // completed: false;
  };

  const removeTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const crossOverTask = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed } // Toggle completion
          : task
      )
    );
   
  };

  const handleClearCompleted = (e) => {
    e.preventDefault();
    setTasks(
      (prev) => prev.filter((task) => task.completed !== true) // Remove completed tasks
    );
   
  };

  const handleActive = (e) => {
    setFilter("active")
    // setButtonActive();
  };

  const handleCompleted = (e) => {
   setFilter("completed")
    // setButtonActive();
  };

  const handleAllButton = () => {
    setFilter("all")  };

  const spanHandler = () => {
    if (tasks.length > 0) {
      setSpanRemoved("d-none");
    } else {
      setSpanRemoved();
    }
  };

  const filterTasks = () => {
    switch (filter) {
      case "all":
        return tasks;
      case "active":
        return tasks.filter((task) => task.completed);
      case "completed":
        return tasks.filter((task) => !task.completed);
      default:
        return tasks;
    }
  };

  return (
    <div className="container justify-content-center col-lg-8 col-md-9 col-sm-11">
      <TaskInput
        addTask={addTask}
        removeTask={removeTask}
        spanHandler={spanHandler}
        spanRemoved={spanRemoved}
        tasksLength={tasks.length}
      />
      <TaskList
        tasks={tasks}
        removeTask={removeTask}
        crossOverTask={crossOverTask}
        spanHandler={spanHandler}
        filterTasks={filterTasks}
        spanRemoved={spanRemoved}
      />
      <Footer
        tasks={tasks}
        handleClearCompleted={handleClearCompleted}
        handleActive={handleActive}
        handleCompleted={handleCompleted}
        handleAllButton={handleAllButton}
        filterTasks={filterTasks}
       
      />
    </div>
  );
}

export default App;
