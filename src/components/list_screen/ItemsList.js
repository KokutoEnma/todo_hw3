import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemCard from './ItemCard';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';

class ItemsList extends React.Component {

    render() {
        const todoList = this.props.todoList;
        if(todoList==null)
            return <div>Loding</div>
        const items = todoList.items;
        return (
            <div className="todo-lists">
                {items && items.map(item => {
                    item.id = item.key;
                    console.log(todoList, item)
                    return (
                        <Link to={'/todoList/'+todoList.id+"/"+item.key} todoList={todoList} item={item}>
                        <ItemCard todoList={todoList} item={item} key={item.key}/>
                        </Link>
                    );})
                }
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const todoList = ownProps.todoList;
    return {
        todoList,
        auth: state.firebase.auth,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'todoLists' },
    ]),
)(ItemsList);