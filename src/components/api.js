 export async function fetchTasks(){
    const response = await fetch("http://yollstudentapi.com/api/todos");
    const data = await response.json();
    console.log(data)
 }