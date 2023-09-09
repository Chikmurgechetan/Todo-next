import { useEffect, useState } from "react";
import classes from "./CompletedTask.module.css";
import { useRouter } from "next/router";

function CompletedTask() {
  const [data, setData] = useState([]);
  const router = useRouter();

  const fetchData = async () => {
    try {
      const response = await fetch("/api");
      if (response.ok) {
        const responseData = await response.json();

        // Filter out completed tasks
        const filteredData = responseData.filter((item) => item.isCompleted);
        setData(filteredData);
      } else {
        console.error("Error:", response.status);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const navigateHandler = () => {
    router.push("/");
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.items}>Completed Tasks</h1>
      <ul className={classes.itemList}>
        {data.map((item, index) => (
          <li key={item._id} className={classes.listItem}>
            {index + 1}: {item.todo}
          </li>
        ))}
      </ul>
      <button onClick={navigateHandler}>Visit Todo List</button>
    </div>
  );
}

export default CompletedTask;
