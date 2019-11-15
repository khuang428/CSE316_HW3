import React from 'react';

class ItemCard extends React.Component {
    render() {
        const { item } = this.props;
        const id = item.id;
        return (
            <>
                {id%2==0?
                <div className="card z-depth-1 todo-list-link blue-grey lighten-1">
                    <div className="card-content white-text row">
                        <div className="card-title col s4">{item.description}</div>
                        <div className="card-title col s3">{item.due_date}</div>
                        {item.completed?<div className="card-title col s3">Completed <i className="material-icons">done</i></div>
                                    :<div className="card-title col s3">Pending <i className="material-icons">alarm</i></div>}
                    </div>
                    <div className="card-content white-text assigned-row">{item.assigned_to}</div>
                </div>
               :<div className="card z-depth-1 todo-list-link blue-grey lighten-2">
                    <div className="card-content white-text row">
                        <div className="card-title col s4">{item.description}</div>
                        <div className="card-title col s3">{item.due_date}</div>
                        {item.completed?<div className="card-title col s3">Completed <i className="material-icons">done</i></div>
                                    :<div className="card-title col s3">Pending <i className="material-icons">alarm</i></div>}
                    </div>
                    <div className="card-content white-text assigned-row">{item.assigned_to}</div>
                </div>}
            
            </>

            
        );
    }
}
export default ItemCard;