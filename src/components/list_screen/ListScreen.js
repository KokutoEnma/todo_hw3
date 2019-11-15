import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { Modal} from 'react-materialize'


class ListScreen extends Component {
    state = {
        name: '',
        owner: '',
        modalActive : false,
    }

    sort_criteria={
        task_increasing: 0,
        task_decreasing: 1,
        due_date_increasing: 2,
        due_date_decreasing: 3,
        status_increasing: 4,
        status_decreasing: 5
    }
    current_sort_criteria=-1;
    dbref= getFirestore().collection("todoLists");


    handleModalClose = () =>{
        this.setState({modalActive:false});
    }

    sortByTask(){
        if(this.current_sort_criteria===this.sort_criteria.task_increasing){
            this.current_sort_criteria=this.sort_criteria.task_decreasing;
        }else
            this.current_sort_criteria=this.sort_criteria.task_increasing;
            
        let items = this.props.todoList.items;
        items.sort(this.compare.bind(this));
        this.dbref.doc(this.props.todoList.id).update({
            items:items
        })
    }

    sortByDueDate(){
        if(this.current_sort_criteria===this.sort_criteria.due_date_increasing){
            this.current_sort_criteria=this.sort_criteria.due_date_decreasing;
        }else
            this.current_sort_criteria=this.sort_criteria.due_date_increasing;

        let items = this.props.todoList.items;
        items.sort(this.compare.bind(this));
        this.dbref.doc(this.props.todoList.id).update({
            items:items
        })
    }

    sortByStatus(){
        if(this.current_sort_criteria===this.sort_criteria.status_increasing){
            this.current_sort_criteria=this.sort_criteria.status_decreasing;
        }else
            this.current_sort_criteria=this.sort_criteria.status_increasing;

        let items = this.props.todoList.items;
        items.sort(this.compare.bind(this));
        this.dbref.doc(this.props.todoList.id).update({
            items:items
        })
    }

    compare(item1, item2){
        if(this.current_sort_criteria===this.sort_criteria.task_decreasing ||
            this.current_sort_criteria===this.sort_criteria.due_date_decreasing ||
            this.current_sort_criteria===this.sort_criteria.status_decreasing){
            let temp=item1;
            item1=item2;
            item2=temp
        }
        if(this.current_sort_criteria===this.sort_criteria.task_increasing ||
            this.current_sort_criteria===this.sort_criteria.task_decreasing){
                console.log("hi")
                if(item1.description<item2.description)
                    return -1;
                if(item1.description>item2.description)
                    return 1;
                else
                    return 0;
            }
        if(this.current_sort_criteria===this.sort_criteria.due_date_increasing ||
            this.current_sort_criteria===this.sort_criteria.due_date_decreasing){
                let date1 = new Date(item1.due_date);
                let date2 = new Date(item2.due_date);
                if(date1<date2)
                    return -1;
                if(date1>date2)
                    return 1;
                else
                    return 0;
            }
        if(this.current_sort_criteria===this.sort_criteria.status_increasing ||
            this.current_sort_criteria===this.sort_criteria.status_decreasing){
                if(item1.completed<item2.completed)
                    return -1;
                if(item1.completed>item2.completed)
                    return 1;
                else
                    return 0;
            }
    }

    handleChange = (e) => {
        e.persist();
        const target = e.target;
        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));

        this.dbref.doc(this.props.todoList.id).update({
            [target.id] : target.value,
        })
    }

    handleNewItem = () =>{
        this.props.history.push('/todoList/'+this.props.todoList.id+"/new");
    }

    deleteList= () => {
        this.dbref.doc(this.props.todoList.id).delete().then(()=>{
            window.location.href="http://localhost:3000/"
        })
    }

    testOwner =() =>{
        const todoList = this.props.todoList;
        if(todoList.owner!="")
            return "active";
    }

    testName =() =>{
        const todoList = this.props.todoList;
        if(todoList.name!="")
            return "active";
    }

    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;
        console.log(this.props)
        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        if(todoList){
            return (
                <div className="container deep-purple lighten-5">
                    <div className="row">
                        <span className="list_page_title grey-text text-darken-3">Todo List</span>
                        <div href="#modal1" className="modal-trigger trash right">
                        &#128465;
                        </div>
                        <Modal id="modal1" header="Modal Header" open={this.state.modalActive} 
                        options={{dismissible:false,preventScrolling:false}}>
                            <header className="dialog_header">
                                Delete list?
                            </header>
                            <section className="dialog_content">
                                <p><strong>Are you sure you want to delete this list?</strong></p>
                            </section>
                                <button id="dialog_yes_button" className='btn' onClick={this.deleteList}>Yes</button>
                                <button id="dialog_no_button" className='btn' onClick={this.handleModalClose}>No</button>
                            <footer className="dialog_footer">
                                The list will not be retreivable.
                            </footer>
                        </Modal>

                    </div>
                    
                    <div className="row">
                        <div className="input-field col s5">
                            <label className={this.testName()}>Name</label>
                            <input className="active" type="text" name="name" id="name" onChange={this.handleChange} value={todoList.name} />
                        </div>
                        <div className="input-field col s5 right">
                            <label className={this.testOwner()}>Owner</label>
                            <input className="active" type="text" name="owner" id="owner" onChange={this.handleChange} value={todoList.owner}/>
                        </div>
                    </div>
                        <div className="card z-depth-0 todo-list-header light-green darken-2">
                            <div className="card-content grey-text text-darken-3 row">
                                    <span className = "card-title header col s4" onClick={this.sortByTask.bind(this)}>Task</span>
                                    <span className = "card-title header col s3" onClick={this.sortByDueDate.bind(this)}>Due Date</span>
                                    <span className = "card-title header col s2" onClick={this.sortByStatus.bind(this)}>Status</span>
                            </div>
                        </div>
                    <ItemsList todoList={todoList}/>
                    <Link to={'/todoList/'+this.props.todoList.id+"/new" } >
                        <div className="card item z-depth-0 todo-list-link" >
                            <div className="card-content grey-text text-darken-3 row valign-wrapper" style={{height:"90px"}}>
                                <span className="large material-icons col s6">add</span>
                            </div>
                        </div>
                    </Link>
                    
                    
      
                </div>
            );
        }else{
            return(
                <div className="container white"></div>
            )
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    
  const { id } = ownProps.match.params;
  const { todoLists } = state.firestore.data;
  const todoList = todoLists ? todoLists[id] : null;
  if(todoList)
    todoList.id=id

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
)(ListScreen);