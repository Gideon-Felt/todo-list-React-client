import React, { Component} from "react"

class TodoItem extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log(this.props.item)
        return (
            <div className="todo-item">
                <input
                    type="checkbox"
                />
                <p>{this.props.item.title}</p>
            </div>
        )
    }
}

export default TodoItem