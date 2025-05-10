import axios from "axios";
import { useState, useEffect } from "react";
import "../App.css";

function Todos() {
  const [todos, setTodos] = useState([]);
  const [todoTitle, setTodoTitle] = useState("");

  async function addTodo() {
    try {
      if (todoTitle.trim() !== "") {
        const response = await axios.post("http://127.0.0.1:8000/api/todo/", {
          title: todoTitle,
          completed: false,
        });
        // console.log("Response: ", response.data);
        setTodos([...todos, response.data]);
        setTodoTitle("");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  async function Todos() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/todo/");
      // console.log("Data: ", response.data);
      setTodos(response.data);
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  async function toggleCompleted(id) {
    try {
      const taskToUpdate = todos.find((todo) => todo.id === id);
      // console.log(taskToUpdate);

      if (taskToUpdate) {
        const response = await axios.put(
          `http://127.0.0.1:8000/api/todo/update/${id}/`,
          {
            completed: !taskToUpdate.completed,
          }
        );

        const updatedTasks = todos.map((todo) => {
          if (todo.id === id) {
            return { ...todo, completed: response.data.completed };
          } else {
            return todo;
          }
        });
        setTodos(updatedTasks);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  async function deleteTodo(id) {
    try {
      await axios.delete(`http://127.0.0.1:8000/api/todo/delete/${id}/`);
      const updateTodo = todos.filter((todo) => todo.id !== id);
      // console.log("Delete: ", updateTodo);
      setTodos(updateTodo);
    } catch (error) {
      console.log("Error: ", error);
    }
  }

  useEffect(() => {
    Todos();
  }, []);

  return (
    <>
      <div className="container">
        <div className="todo-app">
          <div className="app-title">
            <h2>To-do app</h2>
            <i className="fa-solid fa-book-bookmark"></i>
          </div>
          <div className="row">
            <input
              type="text"
              value={todoTitle}
              onChange={(e) => setTodoTitle(e.target.value)}
              id="input-box"
              placeholder="add your tasks"
            />
            <button onClick={addTodo}>Add</button>
          </div>
          <ul id="list-container">
            {todos.map((todo) => {
              console.log(todo);
              return (
                <li key={todo.id} onClick={() => toggleCompleted(todo.id)}>
                  {todo.completed ? <del>{todo.title}</del> : todo.title}
                  <span
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteTodo(todo.id);
                    }}
                  >
                    X
                  </span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Todos;
