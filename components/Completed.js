// Import necessary libraries and styles at the top

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import classes from "./Completed.module.css";

function Completed() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const router = useRouter();

//Function Fetch the data From the backend 
 
const fetchData = async () =>{

   const response = await fetch("/api");
   if(response.ok){
   
    const data = await response.json();
    setTodoList(data); 
    
   } else {
    console.log(data);
   }

}
   
// useEffect to fetch data

useEffect(()=>{
  fetchData();
},)




  const submitHandler = async (event) => {
    event.preventDefault();

    // Create a new task object with a unique ID and initial 'isCompleted' value
    const newTask = { id: Date.now(), todo, isCompleted: false };





   
    // Perform a POST request to add the new task
    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (response.ok) {
        setTodoList((prevList) => [...prevList, newTask]);
        setTodo(""); // Clear the input field
      } else {
        console.log("Error:", response.status);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };
     


    
  

  const changeTodo = (event) => {
    setTodo(event.target.value);
  };

  const handleCheckboxChange = (id) => {
    const updatedData = todoList.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          isCompleted: !item.isCompleted,
        };
      }
      return item;
    });

    setTodoList(updatedData);
  };

  const handleDeleteItem = (id) => {
    // Remove the item when the delete button is clicked
    setTodoList((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const navigateHandler = () => {
    router.push("/completed");
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Todo List</h1>
      <div>
        <form onSubmit={submitHandler} className={classes.form}>
          <label className={classes.label}>Enter Todo</label>
          <input
            type="text"
            value={todo}
            onChange={changeTodo}
            className={classes.input}
          />
          <button className={classes.button} type="submit">
            Add Todo
          </button>
        </form>
      </div>
      <div className={classes.todoList}>
        <h2>Today Thinks:</h2>
        <ul className={classes.list}>
          {todoList.map((item) => (
            <li key={item.id}>
              <input
                type="checkbox"
                className={classes.checkbox}
                checked={item.isCompleted}
                onChange={() => handleCheckboxChange(item.id)}
              />
              {item.todo}
              <button
                onClick={() => handleDeleteItem(item.id)}
                className={classes.deleteItem}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button className={classes.navigate} onClick={navigateHandler}>
        See completed Tasks
      </button>
    </div>
  );
}

export default Completed;
