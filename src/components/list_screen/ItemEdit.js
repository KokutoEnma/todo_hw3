import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import { timingSafeEqual } from 'crypto';
import { getFirestore } from 'redux-firestore';

class ItemEdit extends React.Component {
    render() {
        const todoLists = this.props.todoLists;
        console.log(todoLists)
        return (
            <div className="todo-lists section" style={{marginTop:'50px'}}>
                wefwefwf
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

export default compose(connect(mapStateToProps))(ItemEdit);