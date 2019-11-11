import React from 'react';
import { Button, Icon } from 'react-materialize';

class ItemCard extends React.Component {
    setCompleted = (completed) =>{
        if(completed)
            return <span className="card-title card_completed col s4">Completed</span>
        else
            return <span className="card-title card_pending col s1">Pending</span>
    }
    render() {
        const { item } = this.props;  
        return (
            <div className="card z-depth-0 todo-list-link white lighten-3 hoverable">
                <div className="card-content grey-text text-darken-3 row">
                    <span className="card-title card_description col s12">{item.description}</span>
                    <span className="card-title card_assigned_to col s4">{"Assigned to:"+item.assigned_to}</span>
                    <span className="card-title card_due_date col s3">{item.due_date}</span>
                    {this.setCompleted(item.completed)}
                    <div className="col s1 right">
                        <Button floating fab={{direction: 'left'} } className="red" large>
                            <Button floating icon={<Icon className="materialize-icons">arrow_upward</Icon>} className="red" />
                            <Button floating icon={<Icon className="materialize-icons">arrow_downward</Icon>} className="yellow darken-1" />
                            <Button floating icon={<Icon className="materialize-icons">clear</Icon>} className="green" />
                        </Button>
                    </div>
        
      
                    
                </div>
                
            </div>
        );
    }
}
export default ItemCard;