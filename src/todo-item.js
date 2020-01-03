import React, { Component } from "react";

class TodoItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      done: props.item.done
    }

  }

  toggleDone = () => {
    fetch(`http://localhost:5000/todo/${this.props.item.id}`, {
      method:"PATCH",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        done: !this.state.done
      })
    })
    .then(
      this.setState({
        done: !this.state.done
      })
    )
    .catch(error => console.log("setState Error: " + error))
  }

  render() {
    console.log(this.props.item);
    return (
      <div className="todo-item">
        <input type="checkbox"
        defaultChecked={this.state.done}
        onClick={this.toggleDone}
        />
        <p className={this.state.done ? "done" : null}>{this.props.item.title}</p>
      </div>
    );
  }
}

export default TodoItem;