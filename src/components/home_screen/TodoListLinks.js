import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TodoListCard from './TodoListCard';
import { getFirestore } from 'redux-firestore';
import { firestoreConnect } from 'react-redux-firebase';


class TodoListLinks extends React.Component {

    updateTimeStamp = (id) =>{
        let fireStore = getFirestore();
        fireStore.collection("todoLists").doc(id).update({
            timestamp : fireStore.FieldValue.serverTimestamp()
        })
    }

    render() {
        const todoLists = this.props.todoLists;
        console.log(todoLists)
        return (
            <div className="todo-lists" style={{marginTop:'50px'}}>
                {todoLists && todoLists.map(todoList => (
                    <Link to={'/todoList/' + todoList.id} key={todoList.id} onClick={this.updateTimeStamp.bind(this,todoList.id)}>
                        <TodoListCard todoList={todoList} />
                    </Link>
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todoLists: state.firestore.ordered.todoLists,
        auth: state.firebase.auth,
    };
};
export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'todoLists', orderBy: ['timestamp', 'desc'] },
    ]),
)(TodoListLinks);