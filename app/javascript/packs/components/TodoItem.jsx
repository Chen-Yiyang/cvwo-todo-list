import React from 'react'
import PropTypes from 'prop-types'

import axios from "axios";
import setAxiosHeaders from "./AxiosHeaders";

import _ from "lodash";

class TodoItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            complete: this.props.todoItem.complete,
        }

        this.handleDestroy = this.handleDestroy.bind(this);
        this.path = `/api/v1/todo_items/${this.props.todoItem.id}`;

        // for update
        this.handleChange = this.handleChange.bind(this);
        this.updateTodoItem = this.updateTodoItem.bind(this);
        this.titleRef = React.createRef();
        this.completedRef = React.createRef();
        this.tagsRef = React.createRef();

        this.checkDisplay = this.checkDisplay.bind(this);

    }

    checkDisplay(todoItem) {
        // d-none for completed ?
        if (this.state.complete && this.props.hideCompletedTodoItems) {
            return false;
        }

        // d-none for filtered by tag?
        // not filtered
        if (this.props.tagFilterEntry == "" || !this.props.filterByTag) {
            return true;
        }

        if (todoItem.tags == null) {
            return false;
        }

        const tagsArr = todoItem.tags.split(" ");
        const size = tagsArr.length;
        for (var i = 0; i < size; i++) {
            var tag = tagsArr[i];

            if (tag === this.props.tagFilterEntry) {
                return true;
            }
        }

        return false
    }

    handleChange(updateTag) {
        this.setState({
            complete: this.completedRef.current.checked
        });
        this.updateTodoItem(updateTag);
    }

    // debounce update req.
    // no req sent until no user inputs for 1 sec
    updateTodoItem = _.debounce((updateTag) => {
        setAxiosHeaders();
        axios
            .put(this.path, {
                todo_item: {
                    title: this.titleRef.current.value,
                    complete: this.completedRef.current.checked,
                    tags: this.tagsRef.current.value
                }
            })
            .then(response => {})
            .catch(error => {
                console.log(error);
            });

        // to reload the page for tags update so as to make filtering works properly
        console.log(updateTag);
        if (updateTag) {
            window.location.reload(false);
        }
    }, 1000);

    handleDestroy() {
        setAxiosHeaders();
        const confirmation = confirm("Are you sure?");
        if (confirmation) {
            axios
                .delete(this.path)
                .then(response => {
                    this.props.clearErrors();
                })
                .catch(error => {
                    this.props.handleErrors(error);
                });

            window.location.reload(false);
        }


    }

    render() {
        const { todoItem } = this.props
        return (
            <tr
                className={
                    `${ !this.checkDisplay(todoItem) ? `d-none` : "" }
                    ${this.state.complete ? "table-light" : ""}`
                }
            >
                <td>
                    <svg
                        className={`bi bi-check-circle ${
                            this.state.complete ? `text-success` : `text-muted`
                        }`}
                        width="2em"
                        height="2em"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M17.354 4.646a.5.5 0 010 .708l-7 7a.5.5 0 01-.708 0l-3-3a.5.5 0 11.708-.708L10 11.293l6.646-6.647a.5.5 0 01.708 0z"
                            clipRule="evenodd"
                        />
                        <path
                            fillRule="evenodd"
                            d="M10 4.5a5.5 5.5 0 105.5 5.5.5.5 0 011 0 6.5 6.5 0 11-3.25-5.63.5.5 0 11-.5.865A5.472 5.472 0 0010 4.5z"
                            clipRule="evenodd"
                        />
                    </svg>
                </td>
                <td>
                    <input
                        type="text"
                        defaultValue={todoItem.title}
                        disabled={this.state.complete}

                        // update to-do details
                        onChange={() => this.handleChange(false)}
                        ref={this.titleRef}

                        className="form-control"
                        id={`todoItem__title-${todoItem.id}`}
                    />
                </td>

                <td>
                    <input
                        type="text"
                        defaultValue={todoItem.tags}

                        // update to-do tags
                        onChange={() => this.handleChange(true)}
                        ref={this.tagsRef}

                        /// a bit unsure here
                        id={`todoItem__tags-${todoItem.id}`}
                    />
                </td>

                <td className="text-right">
                    <div className="form-check form-check-inline">
                        <input
                            type="boolean"
                            defaultChecked={this.state.complete}
                            type="checkbox"

                            // update completion
                            onChange={() => this.handleChange(false)}
                            ref={this.completedRef}

                            className="form-check-input"
                            id={`complete-${todoItem.id}`}
                        />
                        <label
                            className="form-check-label"
                            htmlFor={`complete-${todoItem.id}`}
                        >
                            Complete?
                        </label>
                    </div>
                    <button
                        onClick={this.handleDestroy}
                        className="btn btn-outline-danger"
                    >Delete</button>
                </td>
            </tr>
        )
    }
}

export default TodoItem

TodoItem.propTypes = {
    todoItem: PropTypes.object.isRequired,
    getTodoItems: PropTypes.func.isRequired,

    hideCompletedTodoItems: PropTypes.bool.isRequired,

    tagFilterEntry: PropTypes.string.isRequired,
    filterByTag: PropTypes.bool.isRequired,

    clearErrors: PropTypes.func.isRequired
}