import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { Checkbox } from 'react-materialize';


class ItemEdit extends React.Component {

    state = {
        description: '',
        assigned_to: '',
        due_date: null,
        completed: false,
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

      }

    render() {
        const todoList = this.props.todoList;
        const key=this.props.itemKey;
        if(todoList==null)
            return <div>Loading</div>

        const items = todoList.items;
        let item = items.filter(item => {
            return item.key==key
        })[0]
        console.log(item)
        item = (item==null?this.state:item);
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                <h5 className="grey-text text-darken-3">Item Editor</h5>
                <div className="input-field">
                    <label className="active" htmlFor="description">Description</label>
                    <input className="active" type="text" name="text" id="text" onChange={this.handleChange} value={item.description}/>
                </div>
                <div className="input-field">
                    <label className="active" htmlFor="name">Assigned To</label>
                    <input className="active" type="text" name="text" id="text" onChange={this.handleChange} value={item.assigned_to}/>
                </div>
                <div className="input-field active">
                    <label className="active" htmlFor="dueDate">Due Date</label>
                    <input className="active" placeholder="" type="date" name="text" id="text" onChange={this.handleChange} value={item.due_date}/>
                </div>
                <div className="input-field" style={{height:"54px"}}>
                    <label>Status</label>
                    <label style={{left:"100px"}}>
                        
                        <input type="checkbox" value="Status" checked={item.completed?"checked":null}/>
                        <span></span>
                    </label>
                </div>
                <div className="input-field">
                    <button type="submit" className="btn pink lighten-1 z-depth-0">Submit</button>
                    
                    <Link to={"/todoList/"+this.props.todoList.id}><button className="btn pink lighten-1 z-depth-0">Cancel</button></Link>
                </div>
                </form>
            </div>
        );
    }
}
const mapStateToProps = (state, ownProps) => {
    const { id, key } = ownProps.match.params;
    const { todoLists } = state.firestore.data;
    const todoList = todoLists ? todoLists[id] : null;
    return {
        todoList: todoList,
        auth: state.firebase.auth,
        itemKey: key
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'todoLists' },
    ]),
)(ItemEdit);