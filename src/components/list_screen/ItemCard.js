import React from 'react';
import { Button } from 'react-materialize';
import Icon from 'react-materialize/lib/Icon';
import { getFirestore } from 'redux-firestore';

class ItemCard extends React.Component {
    handleMoveUp = (e,id) =>{
        e.preventDefault();
        let listToEdit=this.props.todoList.items;
        let targetItem = listToEdit[id];
        let itemToSwap = listToEdit[id-1];

        listToEdit[id-1] = targetItem;
        targetItem.key--;
        targetItem.id--;

        listToEdit[id] = itemToSwap;
        itemToSwap.key++;
        itemToSwap.id++;

        const fireStore = getFirestore();
        fireStore.collection('todoLists').doc(this.props.todoList.id).update({items:listToEdit});
    }

    handleMoveDown = (e,id) =>{
        e.preventDefault();
        let listToEdit=this.props.todoList.items;
        let targetItem = listToEdit[id];
        let itemToSwap = listToEdit[id+1];

        listToEdit[id+1] = targetItem;
        targetItem.key++;
        targetItem.id++;

        listToEdit[id] = itemToSwap;
        itemToSwap.key--;
        itemToSwap.id--;

        const fireStore = getFirestore();
        fireStore.collection('todoLists').doc(this.props.todoList.id).update({items:listToEdit});
    }

    handleDelete = (e,id) =>{
        e.preventDefault();
        let listToEdit=this.props.todoList.items;
        listToEdit=listToEdit.filter(function(val){ return val.id !== id});
        for(let i = 0;i < listToEdit.length;i++){
            listToEdit[i].key = i;
            listToEdit[i].id = i;
        }
        const fireStore = getFirestore();
        fireStore.collection('todoLists').doc(this.props.todoList.id).update({items:listToEdit});
    }

    handleEmptyClick = (e) =>{
        e.preventDefault();
    }
    render() {
        const { item } = this.props;
        const { todoList } = this.props;
        const id = item.id;
        return (
            <>
                {id%2==0?
                <div className="card z-depth-1 todo-list-link blue-grey lighten-1">
                    <div className="card-content white-text row">
                        <div className="card-title col s3">{item.description}</div>
                        <div className="card-title col s3">{item.due_date}</div>
                        {item.completed?<div className="card-title col s3">Completed <i className="material-icons">alarm_on</i></div>
                                    :<div className="card-title col s3">Pending <i className="material-icons">alarm</i></div>}
                        <Button floating fab={{direction: 'left'}} icon={<Icon>dehaze</Icon>} large className="grey darken-2" onClick={(e)=>this.handleEmptyClick(e)}>
                            {id==0?<Button floating icon={<Icon>arrow_upward</Icon>} className="grey lighten-2" onClick={(e)=>this.handleEmptyClick(e)}/>
                                  :<Button floating icon={<Icon>arrow_upward</Icon>} className="yellow darken-1" onClick={(e)=>this.handleMoveUp(e,id)}/>}
                            {id==todoList.items.length-1?<Button floating icon={<Icon>arrow_downward</Icon>} className="grey lighten-2" onClick={(e)=>this.handleEmptyClick(e)}/>
                                                        :<Button floating icon={<Icon>arrow_downward</Icon>} className="amber darken-1" onClick={(e)=>this.handleMoveDown(e,id)}/>}
                            <Button floating icon={<Icon>delete</Icon>} className="orange darken-1" onClick={(e)=>this.handleDelete(e,id)}/>
                        </Button>
                    </div>
                    <div className="card-content white-text assigned-row">Assigned to: {item.assigned_to}</div>
                </div>
               :<div className="card z-depth-1 todo-list-link blue-grey lighten-2">
                    <div className="card-content white-text row">
                        <div className="card-title col s3">{item.description}</div>
                        <div className="card-title col s3">{item.due_date}</div>
                        {item.completed?<div className="card-title col s3">Completed <i className="material-icons">alarm_on</i></div>
                                    :<div className="card-title col s3">Pending <i className="material-icons">alarm</i></div>}
                        <Button floating fab={{direction: 'left'}} icon={<Icon>dehaze</Icon>} large className="grey darken-2" onClick={(e)=>this.handleEmptyClick(e)}>
                            <Button floating icon={<Icon>arrow_upward</Icon>} className="yellow darken-1" onClick={(e)=>this.handleMoveUp(e,id)}/>
                            {id==todoList.items.length-1?<Button floating icon={<Icon>arrow_downward</Icon>} className="grey lighten-2" onClick={(e)=>this.handleEmptyClick(e)}/>
                                                        :<Button floating icon={<Icon>arrow_downward</Icon>} className="amber darken-1" onClick={(e)=>this.handleMoveDown(e,id)}/>}
                            <Button floating icon={<Icon>delete</Icon>} className="orange darken-1" onClick={(e)=>this.handleDelete(e,id)}/>
                        </Button>
                    </div>
                    <div className="card-content white-text assigned-row">Assigned to: {item.assigned_to}</div>
                </div>}
            
            </>

            
        );
    }
}
export default ItemCard;