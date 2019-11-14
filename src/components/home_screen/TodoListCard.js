import React from 'react';

class TodoListCard extends React.Component {

    render() {
        const { todoList } = this.props;
        console.log(this.props)
        return (
            <div className="card list z-depth-0 todo-list-link">
                <div className="card-content grey-text text-darken-3">
                    <span className="card-title">{todoList.name==""?"Unknown":todoList.name}</span>
                </div>
            </div>
        );
    }
}
export default TodoListCard;