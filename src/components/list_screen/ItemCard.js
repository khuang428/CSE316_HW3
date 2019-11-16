import React from 'react';
import { Button } from 'react-materialize';
import Icon from 'react-materialize/lib/Icon';

class ItemCard extends React.Component {
    handleEdit = (e) =>{
        const { target } = e;


    }
    render() {
        const { item } = this.props;
        const id = item.id;
        return (
            <>
                {id%2==0?
                <div className="card z-depth-1 todo-list-link blue-grey lighten-1">
                    <div className="card-content white-text row">
                        <div className="card-title col s3">{item.description}</div>
                        <div className="card-title col s3">{item.due_date}</div>
                        {item.completed?<div className="card-title col s3">Completed <i className="material-icons">check</i></div>
                                    :<div className="card-title col s3">Pending <i className="material-icons">alarm</i></div>}
                        <Button floating fab={{direction: 'left'}} icon={<Icon>dehaze</Icon>} large className="grey darken-2">
                            <Button floating icon={<Icon>arrow_upward</Icon>} className="grey darken-1" />
                            <Button floating icon={<Icon>arrow_downward</Icon>} className="grey darken-1" />
                            <Button floating icon={<Icon>delete</Icon>} className="grey darken-1" />
                        </Button>
                    </div>
                    <div className="card-content white-text assigned-row">Assigned to: {item.assigned_to}</div>
                </div>
               :<div className="card z-depth-1 todo-list-link blue-grey lighten-2">
                    <div className="card-content white-text row">
                        <div className="card-title col s3">{item.description}</div>
                        <div className="card-title col s3">{item.due_date}</div>
                        {item.completed?<div className="card-title col s3">Completed <i className="material-icons">done</i></div>
                                    :<div className="card-title col s3">Pending <i className="material-icons">alarm</i></div>}
                        <Button floating fab={{direction: 'left'}} icon={<Icon>dehaze</Icon>} large className="grey darken-2">
                            <Button floating icon={<Icon>arrow_upward</Icon>} className="grey darken-1" />
                            <Button floating icon={<Icon>arrow_downward</Icon>} className="grey darken-1" />
                            <Button floating icon={<Icon>delete</Icon>} className="grey darken-1" />
                        </Button>
                    </div>
                    <div className="card-content white-text assigned-row">Assigned to: {item.assigned_to}</div>
                </div>}
            
            </>

            
        );
    }
}
export default ItemCard;