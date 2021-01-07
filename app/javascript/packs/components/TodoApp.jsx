// app/javascript/packs/components/TodoApp.jsx
import React from 'react'
import ReactDOM from 'react-dom'

import axios from "axios";

import TodoItems from "./TodoItems";
import TodoItem from "./TodoItem";
import TodoForm from "./TodoForm";
import ErrorMessage from "./ErrorMessage";

class TodoApp extends React.Component {
    constructor(props) {
        super(props);

        // hold todo items in state
        this.state = {
            todoItems: [],
            hideCompletedTodoItems: false,

            errorMessage: null
        };

        this.getTodoItems = this.getTodoItems.bind(this);
        this.createTodoItem = this.createTodoItem.bind(this);

        this.toggleCompletedTodoItems = this.toggleCompletedTodoItems.bind(this);


        // error handling
        this.handleErrors = this.handleErrors.bind(this);
        this.clearErrors = this.clearErrors.bind(this);
    }

    toggleCompletedTodoItems() {
        this.setState({
            hideCompletedTodoItems: !this.state.hideCompletedTodoItems
        });
    }

    componentDidMount() {
        this.getTodoItems();
    }

    getTodoItems() {
        axios
            .get("/api/v1/todo_items")
            .then(response => {
                const todoItems = response.data;
                this.setState({ todoItems });
            })
            .catch(error => {
                console.log(error);
            });
    }

    createTodoItem(todoItem) {
        const todoItems = [todoItem, ...this.state.todoItems];
        this.setState({ todoItems });
    }



    // error handling
    handleErrors(errorMessage) {
        this.setState({ errorMessage });
    }
    clearErrors() {
        this.setState({
            errorMessage: null
        });
    }



    render() {
        return (
            <>
                {this.state.errorMessage && (
                    <ErrorMessage errorMessage={this.state.errorMessage} />
                )}

                <TodoForm
                    createTodoItem={this.createTodoItem}
                    handleErrors={this.handleErrors}
                    clearErrors={this.clearErrors}
                />
                <TodoItems
                    toggleCompletedTodoItems={this.toggleCompletedTodoItems}
                    hideCompletedTodoItems={this.state.hideCompletedTodoItems}
                >
                    {this.state.todoItems.map(todoItem => (
                        <TodoItem
                            key={todoItem.id}
                            todoItem={todoItem}
                            getTodoItems={this.getTodoItems}

                            hideCompletedTodoItems={this.state.hideCompletedTodoItems}
                        />
                    ))}
                </TodoItems>
            </>
        );
    }
}

document.addEventListener('turbolinks:load', () => {
    const app = document.getElementById('todo-app')
    app && ReactDOM.render(<TodoApp />, app)
})