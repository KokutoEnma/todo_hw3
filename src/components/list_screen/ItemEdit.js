import React, { Component } from 'react';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { getFirestore } from 'redux-firestore';
import { Checkbox } from 'react-materialize';


class ItemEdit extends React.Component {

    state = {
        email: '',
        password: '',
        firstName: '',
        lastName: '',
      }
    
      handleChange = (e) => {
        const { target } = e;
        this.setState(state => ({
          ...state,
          [target.id]: target.value,
        }));
      }
    
      handleSubmit = (e) => {
        e.preventDefault();
        const { props, state } = this;
        const { firebase } = props;
        const newUser = { ...state };
        props.register(newUser, firebase);
      }

    render() {
        const todoLists = this.props.todoLists;
        console.log(this.props)
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                <h5 className="grey-text text-darken-3">Item Editor</h5>
                <div className="input-field">
                    <label className="active" htmlFor="description">Description</label>
                    <input className="active" type="text" name="text" id="text" onChange={this.handleChange} />
                </div>
                <div className="input-field">
                    <label className="active" htmlFor="name">Assigned To</label>
                    <input className="active" type="text" name="text" id="text" onChange={this.handleChange} />
                </div>
                <div className="input-field active">
                    <label className="active" htmlFor="dueDate">Due Date</label>
                    <input className="active" placeholder="" type="date" name="text" id="text" onChange={this.handleChange} />
                </div>
                <div className="input-field" style={{height:"54px"}}>
                    <label>Status</label>
                    <label style={{left:"100px"}}>
                        
                        <input type="checkbox" value="Status" />
                        <span></span>
                    </label>
                </div>
                <div className="input-field">
                    <button type="submit" className="btn pink lighten-1 z-depth-0">Submit</button>
                    <button type="submit" className="btn pink lighten-1 z-depth-0">Cancel</button>
                </div>
                </form>
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

export default compose(connect(mapStateToProps))(ItemEdit);