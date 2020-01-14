import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom";
import axios from "axios";

import TodoItem from "./todo-item";
import "./styles.css";

function App() {
  const [todo, setTodo] = useState('')
  const [todos, setTodos] = useState([])

  useEffect(() => {
    fetch("http://localhost:5000/todos")
      .then(response => response.json())
      .then(data => {
        setTodos(data)
      });
  }, [])

  const addTodo = e => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/todo", {
        title: todo,
        done: false
      })
      .then(data => {
        setTodos([...todos, data.data])
        setTodo("")
      })
      .catch(error => console.log("Add todo Error: ", error));
  };

  const handleChange = e => {
    setTodo(e.target.value)
  };

  const renderTodos = () => {
    return todos.map(item => {
      return <TodoItem key={item.id} item={item} deleteItem={deleteItem}/>;
    });
  };

  const deleteItem = id => {
    fetch(`http://localhost:5000/todo/${id}`, {
      method: "DELETE"
    })
    .then(setTodos(todos.filter(item => {
          return item.id !== id
        })
      )
    )
    .catch(error => console.log("DeleteItem Error ", error))
  }


  return (
    <div className="app">
      <h1>ToDo List</h1>
      <form className="add-todo" onSubmit={addTodo}>
        <input
          type="text"
          placeholder="Add Todo"
          onChange={handleChange}
          value={todo}
        />
        <button type="submit">Add</button>
      </form>
      {renderTodos()}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);