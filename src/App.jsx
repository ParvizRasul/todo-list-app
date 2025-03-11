import { useEffect, useState } from "react";
import Footer from "./components/Footer.jsx";
import TaskInput from "./components/TaskInput.jsx";
import TaskList from "./components/TaskList.jsx";
import TaskCard from "./components/TaskCard.jsx";

function App({ task }) {
  const [tasks, setTasks] = useState([]);
  const [crossed, setCrossed] = useState("");
  const [spanRemoved, setSpanRemoved] = useState("d-active");
  const [filter, setFilter] = useState("all");
  



  const fetchTasks = async () => {
    try {
      const response = await fetch(
        "http://yollstudentapi.com/api/todos?user_id=12"
      );
      const data = await response.json();
      console.log("Fetched data", data);
      setTasks(Array.isArray(data) ? data : []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchTasks();
    
  }, []);

  const addTask = (newtask) => {
    setTasks((prev) => [...tasks, { ...newtask, completed: false }]);
    // completed: false;
  };

  const crossOverTask = async (task) => {
    // comment out this
    try{
    setTasks((prevTasks) =>
      prevTasks.map((curTask) =>
        curTask.id === task.id
          ? { ...curTask, completed: !task.completed } // Toggle completion
          : curTask
      )
    );
    // make a put request with taskId
    const payload = {
      title: task.title,
      completed: !task.completed
    };

    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    };

    const URL = `http://yollstudentapi.com/api/todos/${task.id}?user_id=12`;
     const response = await fetch(URL, options);
     if(!response.ok){
      throw new Error("Failed to update task" + response.statusText);
     }else{
      const data = await response.json();
      console.log("Updated task from server:", data);

      setTasks((prevTasks) => prevTasks.map((updTask) => updTask.id === task.id ? {...updTask, completed: updTask.completed} : updTask ))
     }
    }catch(err){
      console.log(err);
      setTasks((prevTasks) =>
        prevTasks.map((curTask) =>
          curTask.id === task.id
            ? { ...curTask, completed: task.completed } // Revert to original state
            : curTask
        )
      );
    }
  };
    

    // once its finished with success
    // make a fetch request to update the state

    // fetchTasks();


  const removeTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const handleClearCompleted = (e) => {
    e.preventDefault();
    setTasks(
      (prev) => prev.filter((task) => task.completed !== true) // Remove completed tasks
    );
  };

  const handleActive = (e) => {
    setFilter("active");
   
  };

  const handleCompleted = (e) => {
    setFilter("completed");
  };

  // const handleUpdate= async ()=>{
  //   const fetchedTasks = await fetchTasks();


  // }

  const handleAllButton = () => {
    setFilter("all");
  };

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
        return tasks.filter((task) => !task.completed);
      case "completed":
        return tasks.filter((task) => task.completed);
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
        setTask={setTasks}
      />
      <TaskList
        tasks={tasks}
        removeTask={removeTask}
        crossOverTask={crossOverTask}
        spanHandler={spanHandler}
        filterTasks={filterTasks}
        spanRemoved={spanRemoved}
        fetchTasks={fetchTasks}
       
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
