import React from "react";
import ReactDOM from "react-dom";

import TodoItem from "./todo-item";
import "./styles.css";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      todo: "",
      todos: []
    };
  }

  componentDidMount() {
    fetch("http://localhost:5000/todos")
      .then(response => response.json())
      .then(data => {
        this.setState({
          todos: data
        });
      });
  }

  addTodo = e => {
    e.preventDefault();
    console.log(this.state.todo);
  };

  handleChange = e => {
    this.setState({
      todo: e.target.value
    });
  };

  renderTodos = () => {
    return this.state.todos.map(item => {
      return <TodoItem key={item.id} item={item} />;
    });
  };

  render() {
    return (
      <div className="app">
        <h1>ToDo List</h1>
        <form className="add-todo" onSubmit={this.addTodo}>
          <input
            type="text"
            placeholder="Add Todo"
            onChange={this.handleChange}
            value={this.state.todo}
          />
          <button type="submit">Add</button>
        </form>
        {this.renderTodos()}
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);