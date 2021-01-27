// app/javascript/packs/components/TodoForm.jsx
import React from 'react'
import PropTypes from 'prop-types'

import axios from 'axios'

import setAxiosHeaders from "./AxiosHeaders";

class TodoForm extends React.Component {
    constructor(props) {
        super(props)
        this.handleSubmit = this.handleSubmit.bind(this)


    }

    handleSubmit(e) {
        e.preventDefault()
        setAxiosHeaders()

        console.log(this.tagsRef.current.value)
        console.log(this.tagsRef.current.value)

        axios
            .post('/api/v1/todo_items', {
                todo_item: {
                    title: e.target.title,
                    complete: false,
                    tags: this.tagsRef.current.value
                },
            })
            .then(response => {
                const todoItem = response.data
                this.props.createTodoItem(todoItem)

                this.props.clearErrors();
            })
            .catch(error => {
                this.props.handleErrors(error);
            })
        e.target.reset()



        // copied, to be deleted
        e.preventDefault();
        // get our form data out of state
        const { fname, lname, email } = this.state;

        axios.post('/', { fname, lname, email })
            .then((result) => {
                //access the results here....
            });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="my-3">
                <input
                    type="text"
                    name="title"
                    ref={this.titleRef}
                    required
                    className="form-control"
                    id="title"
                    placeholder="Write your todo item here..."
                />
                <input
                    type="text"
                    name="tags"
                    ref={this.tagsRef}
                    className="form-control"
                    id="tags"
                    placeholder="Add its tags, separated by space"
                />
                <button className="btn btn-outline-success btn-block">
                    Add To Do Item
                </button>
            </form>
        )
    }
}

export default TodoForm

TodoForm.propTypes = {
    createTodoItem: PropTypes.func.isRequired,

    // error handling
    handleErrors: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
}