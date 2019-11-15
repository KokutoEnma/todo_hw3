import React, { Component } from 'react';
import {Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { Checkbox } from 'react-materialize';
import { stat } from 'fs';


class ItemEdit extends React.Component {

    state = {
        description: '',
        assigned_to: '',
        due_date: '',
        completed: false,
        is_editing:false,
      }
    
      handleChange = (e) => {
                
        const target = e.target;
        if(target.id=='completed'){
            this.setState(state => ({
                ...state,
                [target.id]: target.checked,
            }));
        }
        else{
            this.setState(state => ({
                ...state,
                [target.id]: target.value,
            }));
        }
      }
    
      handleSubmit = (e) => {
        e.preventDefault();
        const { props, state } = this;
        const key=props.match.params.key;
        const { firestore } = props;
        const todoList = this.props.todoList;
        todoList.items.map( item => {
            if(item.key==key){
                item.description = state.description;
                item.assigned_to = state.assigned_to;
                item.due_date = state.due_date;
                item.completed = state.completed;
            }
        })

        if(key=='new'){
            const uuidv1 = require('uuid/v1');
            const key = uuidv1();
            todoList.items.push({
                description:state.description,
                assigned_to:state.assigned_to,
                due_date:state.due_date,
                completed:state.completed,
                key:key
            })
        }
        firestore.collection("todoLists").doc(props.match.params.id).update({
            items:todoList.items
        });

        this.props.history.push('/todoList/'+this.props.match.params.id);
      }

    testDescription =() =>{
        const item = this.props.item;
        if(item==null)
            return '';
        if(item.description!="")
            return "active";
    }
    testAssignedTo =() =>{
        const item = this.props.item;
        if(item==null)
            return '';
        if(item.assigned_to!="")
            return "active";
    }

    render() {
        
        if(this.state.is_editing==false && this.props.item!=null){
            this.state = this.props.item;
            this.state.is_editing=true;
        }
        return (
            <div className="container">
                <form onSubmit={this.handleSubmit} className="white">
                <h5 className="grey-text text-darken-3">Item Editor</h5>
                <div className="input-field">
                    <label className={this.testDescription()} htmlFor="description">Description</label>
                    <input className="active" type="text" name="text" id="description" onChange={this.handleChange} value={this.state.description}/>
                </div>
                <div className="input-field">
                    <label className={this.testAssignedTo()} htmlFor="name">Assigned To</label>
                    <input className="active" type="text" name="text" id="assigned_to" onChange={this.handleChange} value={this.state.assigned_to}/>
                </div>
                <div className="input-field active">
                    <label className="active" htmlFor="dueDate">Due Date</label>
                    <input className="active" placeholder="" type="date" name="text" id="due_date" onChange={this.handleChange} value={this.state.due_date}/>
                </div>
                <div className="input-field" style={{height:"54px"}}>
                    <label>Status</label>
                    <label style={{left:"100px"}}>
                        
                        <input type="checkbox" id='completed' checked={this.state.completed?"checked":null} onChange={this.handleChange}/>
                        <span></span>
                    </label>
                </div>
                <div className="input-field">
                    <button type="submit" className="btn pink lighten-1 z-depth-0">Submit</button>
                    
                    <Link to={"/todoList/"+this.props.match.params.id}><button className="btn pink lighten-1 z-depth-0">Cancel</button></Link>
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
    let item=null;
    if(todoList!=null){
        item = todoList.items.filter(item => {
            return item.key==key
        })[0]
    }
    return {
        todoList:todoList,
        item: item,
        auth: state.firebase.auth,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
        { collection: 'todoLists' },
    ]),
)(ItemEdit);