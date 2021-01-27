// app/javascript/packs/components/TodoItems.jsx
import React from 'react'
import PropTypes from 'prop-types'

class TodoItems extends React.Component {
    constructor(props) {
        super(props)
        this.completedClick = this.completedClick.bind(this)
        this.tagClick = this.tagClick.bind(this)
        this.tagUpdate = this.tagUpdate.bind(this)

        this.inputRef = React.createRef();

    }

    completedClick() {
        this.props.toggleCompletedTodoItems()
    }

    tagClick() {
        this.props.toggleFilteredByTag()
    }

    tagUpdate() {
        var newEntry = this.inputRef.current.value
        this.props.tagUpdate(newEntry)
    }

    render() {
        return (
            <div>
                <hr />
                <button
                    className="btn btn-outline-primary btn-block mb-3"
                    onClick={this.completedClick}
                >
                    {this.props.hideCompletedTodoItems
                        ? `Show Completed Items`
                        : `Hide Completed Items `}
                </button>

                <div className="row">
                    <input className="tag-search-entry"
                        type="text"
                        defaultValue={this.props.tagFilterEntry}
                        onChange={this.tagUpdate}
                        ref = {this.inputRef}
                        placeholder="Target tag(s) for filtering"
                    />

                    <button
                        className="btn btn-outline-primary btn-block mb-3"
                        onClick={this.tagClick}
                    >
                        {this.props.filterByTag
                            ? `Show All Items`
                            : `Filter by Tags`}
                    </button>
                </div>

                <div className="table-responsive">
                    <table className="table">
                        <thead>
                        <tr>
                            <th scope="col">Status</th>
                            <th scope="col">Item</th>
                            <th scope="col">Tags</th>
                            <th scope="col" className="text-right">
                                Actions
                            </th>
                        </tr>
                        </thead>
                        <tbody>{this.props.children}</tbody>
                    </table>
                </div>
            </div>
        )
    }
}
export default TodoItems

TodoItems.propTypes = {
    toggleCompletedTodoItems: PropTypes.func.isRequired,
    hideCompletedTodoItems: PropTypes.bool.isRequired,

    toggleFilteredByTag: PropTypes.func.isRequired,
    tagUpdate: PropTypes.func.isRequired,
    filterByTag: PropTypes.bool.isRequired
}