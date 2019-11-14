import React from 'react';
import { Button, Icon } from 'react-materialize';
import { getFirestore } from 'redux-firestore';

class ItemCard extends React.Component {

    dbref= getFirestore().collection("todoLists");

    setCompleted = (completed) =>{
        if(completed)
            return <span className="card-title card_completed col s4">Completed</span>
        else
            return <span className="card-title card_pending col s4">Pending</span>
    }

    foolProof = () =>{
        this.dbref.doc(this.props.todoList.id).get().then(doc=>{
            const items = doc.data().items;
            const first = items[0].key;
            const last = items[items.length-1].key;

            Array.from(items).forEach((item)=>{
                document.getElementById('up_'+item.key).classList.remove('disable');
                document.getElementById('down_'+item.key).classList.remove('disable');
            })

            document.getElementById('up_'+first).classList.add('disable')
            document.getElementById('down_'+last).classList.add('disable')
        })
    }

    moveCardUp = (index, e) =>{
        e.preventDefault();
        e.stopPropagation();
        let items=this.props.todoList.items;
        for(let i=0;i<items.length;i++){
            if(items[i].id==index){
                if(i==0){
                    return;
                }
                let temp=items[i];
                items[i]=items[i-1];
                items[i-1]=temp;
                this.dbref.doc(this.props.todoList.id).update({
                    items:items
                }).then(this.foolProof)
            }
        }
    }

    moveCardDown(index, e) {
        e.preventDefault();
        let items=this.props.todoList.items;
        for(let i=0;i<items.length;i++){
            if(items[i].id==index){
                if(i==items.length-1){
                    return;
                }
                let temp=items[i];
                items[i]=items[i+1];
                items[i+1]=temp;
                this.dbref.doc(this.props.todoList.id).update({
                    items:items
                }).then(this.foolProof)
                return;
            }
        }
    }

    deleteCard(index, e) {
        e.preventDefault();
        let items=this.props.todoList.items;
        for(let i=0;i<items.length;i++){
            if(items[i].id==index){
                items.splice(i,1)
                this.dbref.doc(this.props.todoList.id).update({
                    items:items
                }).then(this.foolProof)
            }
        }
    }

    


    render() {
        const { item } = this.props;  
        return (
            <div className="card z-depth-0 todo-list-link lighten-3" >
                <div className="card-content grey-text text-darken-3 row">
                    <span className="card-title card_description col s12">{item.description}</span>
                    <span className="card-title card_assigned_to col s4">{"Assigned to:"+item.assigned_to}</span>
                    <span className="card-title card_due_date col s3">{item.due_date}</span>
                    {this.setCompleted(item.completed)}
                    <div className="fab_button">
                        <Button floating fab={{direction: 'left'}} className="red"  large>
                            <Button floating id={"up_"+item.key} icon={<Icon className="materialize-icons" >arrow_upward</Icon>} className="red" onClick={this.moveCardUp.bind(this, this.props.item.id)}/>
                            <Button floating id={"down_"+item.key} icon={<Icon className="materialize-icons" >arrow_downward</Icon>} className="blue" onClick={this.moveCardDown.bind(this, this.props.item.id)}/>
                            <Button floating id={"delete_"+item.key} icon={<Icon className="materialize-icons" >clear</Icon>} className="green" onClick={this.deleteCard.bind(this, this.props.item.id)}/>
                        </Button>
                    </div>
        
      
                    
                </div>
                {this.foolProof()}
            </div>
        );
    }
}
export default ItemCard;