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
            <div className="card z-depth-0 todo-list-link white lighten-3 hoverable">
                <div className="card-content grey-text text-darken-3 row">
                    <span className="card-title card_description col s12">{item.description}</span>
                    <span className="card-title card_assigned_to col s4">{"Assigned to:"+item.assigned_to}</span>
                    <span className="card-title card_due_date col s3">{item.due_date}</span>
                    {this.setCompleted(item.completed)}
                
                <div className="fixed-action-btn right" onClick={()=>console.log("hi")}>
                    <a ref="#" className="btn-floating red btn-large">
                        <i className="large material-icons">mode_edit</i>
                    </a>
                    <ul>
                        <li><a ref="#" className="btn-floating blue btn-large"><i 
                        className="large material-icons">insert_chart</i></a></li>
                        <li><a ref="#" className="btn-floating green btn-large"><i 
                        className="large material-icons">format_quotes</i></a></li>
                        <li><a ref="#" className="btn-floating yellow btn-large"><i 
                        className="large material-icons">publish</i></a></li>
                        <li><a ref="#" className="btn-floating orange btn-large"><i 
                        className="large material-icons">attach_file</i></a></li>
                    </ul>
                </div>
        
      
                    
                </div>
                
            </div>
        );
    }
}
export default ItemCard;