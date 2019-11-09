import React from 'react';

class ItemCard extends React.Component {
    setCompleted = (completed) =>{
        if(completed)
            return <span className="card-title card_completed col s2">Completed</span>
        else
            return <span className="card-title card_pending col s2">Pending</span>
    }
    render() {
        const { item } = this.props;  
        return (
            <div className="card z-depth-0 todo-list-link white lighten-3">
                <div className="card-content grey-text text-darken-3 row">
                    <span className="card-title card_description col s12">{item.description}</span>
                    <span className="card-title card_assigned_to col s4">{"Assigned to:"+item.assigned_to}</span>
                    <span className="card-title card_due_date col s3">{item.due_date}</span>
                    {this.setCompleted(item.completed)}
                    
                </div>
            </div>
        );
    }
}
export default ItemCard;