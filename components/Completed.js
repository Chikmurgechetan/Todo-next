import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import classes from "./Completed.module.css";

function Completed() {
  const [todo, setTodo] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [editingItemId, setEditingItemId] = useState(null);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const response = await fetch("/api");
      if (response.ok) {
        const data = await response.json();
        setTodoList(data);
      } else {
        console.error("Error fetching data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!todo.trim()) {
      // Validate that the todo is not empty
      return;
    }

    const newTask = { todo, isCompleted: false };

    try {
      if (editingItemId) {
        const response = await fetch(`/api/${editingItemId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTask),
        });
        if (response.ok) {
          console.log("Item updated successfully");
          setEditingItemId(null);
        } else {
          console.error("Error updating item:", response.status);
        }
      } else {
        const response = await fetch("/api", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTask),
        });

        if (response.ok) {
          fetchData();
          setTodo("");
        } else {
          console.error("Error adding item:", response.status);
        }
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const changeTodo = (event) => {
    setTodo(event.target.value);
  };

  const handleCheckboxChange = async (id) => {
   
      const updatedData = todoList.map((item) => {
        if (item._id === id) {
          // Toggle the isCompleted value
          console.log(item);
          return {
            ...item,
            isCompleted: !item.isCompleted,
          };
        }
        return item;
      });
  
      setTodoList(updatedData);
         
    const updatedItem = updatedData.find((item) => item._id === id);
    const response = await fetch(`/api/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedItem),
    });
    
    console.log(response);
    const responseData = await response.text(); // Try using response.text() instead of response.json()
    console.log(responseData);
    
   
  };
  
  
  
  
  const handleDeleteItem = async (id) => {
   try{
    const response = await fetch (`/api/${id}`,{
    method:'DELETE',
   });

   if(response.ok){
    fetchData()
   console.log("item deleted successfully");
  } else {
    console.log("error deleting item:", response.status);
 }
} catch (error) {
  console.log("Error deleting item", error. message);
}
    
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
        <h2>Today's Tasks:</h2>
        <ul className={classes.list}>
          {todoList.map((item) => (
            <li key={item._id}>
              <input
                type="checkbox"
                className={classes.checkbox}
                checked={item.isCompleted}
                onChange={() => handleCheckboxChange(item._id)}
              />
              {item.todo}
              <button
                onClick={() => handleDeleteItem(item._id)}
                className={classes.deletitem}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
      <button className={classes.navigate} onClick={navigateHandler}>
        See Completed Tasks
      </button>
    </div>
  );
}

export default Completed;
