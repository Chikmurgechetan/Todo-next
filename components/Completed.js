// Import necessary libraries and styles at the top

import { useState } from "react";
import { useRouter } from "next/router";
import classes from "./Completed.module.css";

function Completed() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const router = useRouter();

  const submitHandler = (event) => {
    event.preventDefault();

    // Create a new task object with a unique ID and initial 'isCompleted' value
    const newTask = { id: Date.now(), todo, isCompleted: false };

    setTodoList((prevList) => [...prevList, newTask]);
    setTodo(""); // Clear the input field
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
