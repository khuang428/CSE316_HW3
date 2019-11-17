import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import ItemCard from './ItemCard';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';

class ItemsList extends React.Component {

    state ={
        sort_criteria: this.props.todoList.sort_criteria
    }

    handleSort = (e, criteria) =>{
        const { target } = e;
        const targetId = target.id;
        let listToEdit = this.props.todoList.items;
        this.setState({sort_criteria: criteria},function(){
            listToEdit = listToEdit.sort(this.compare);
            for(let i = 0;i < listToEdit.length;i++){
                listToEdit[i].key = i;
                listToEdit[i].id = i;
                const firestore = getFirestore();
                firestore.collection('todoLists').doc(this.props.todoList.id).update({items: listToEdit, sort_criteria: this.state.sort_criteria}); 
            }
        });    
    }

    compare = (a,b) => {
        const criteria = this.state.sort_criteria;
        if(criteria == "descriptionDecreasing" || criteria == "dueDateDecreasing" || criteria == "completedDecreasing"){
            let temp = a;
            a = b;
            b = temp;
        }
        if(criteria == "descriptionIncreasing" || criteria == "descriptionDecreasing"){
            if(a.description < b.description){
                return -1;
            }else if(a.description > b.description){
                return 1;
            }else{
                return 0;
            }
        }else if(criteria == "dueDateIncreasing" || criteria == "dueDateDecreasing"){
            if(a.due_date < b.due_date){
                return -1;
            }else if(a.due_date > b.due_date){
                return 1;
            }else{
                return 0;
            }
        }else{
            if(a.completed < b.completed){
                return -1;
            }else if(a.completed > b.completed){
                return 1;
            }else{
                return 0;
            }
        }
    }

    render() {
        const todoList = this.props.todoList;
        const items = todoList.items;
        console.log("ItemsList: todoList.id " + todoList.id);
        return (
            <div className="todo-lists section">
                <div className="card z-depth-1 blue-grey darken-1">
                    <div className="card-content white-text row">
                        <div className="card-title col s3 list-header" id ="description" onClick={this.state.sort_criteria == "descriptionIncreasing"? (e) => {this.handleSort(e,"descriptionDecreasing")}
                                                                                                                                              : (e) => {this.handleSort(e,"descriptionIncreasing")}}>Description</div>
                        <div className="card-title col s3 list-header" id ="due_date" onClick={this.state.sort_criteria == "dueDateIncreasing"? (e) => {this.handleSort(e,"dueDateDecreasing")}
                                                                                                                                              : (e) => {this.handleSort(e,"dueDateIncreasing")}}>Due Date</div>
                        <div className="card-title col s3 list-header" id ="status" onClick={this.state.sort_criteria == "completedIncreasing"? (e) => {this.handleSort(e,"completedDecreasing")}
                                                                                                                                              : (e) => {this.handleSort(e,"completedIncreasing")}}>Status</div>
                    </div>
                </div>

                {items && items.map(function(item) {
                    item.id = item.key;
                    return (
                        <Link to={'/todoList/' + todoList.id + '/' + item.id} key={item.id}>
                            <ItemCard todoList={todoList} item={item} />
                        </Link>
                        
                    );})
                }
                <Link to={'/todoList/' + todoList.id + '/newItem'}>
                    {items.length%2==0?<div className="card blue-grey lighten-1 add-item-card"><i className="material-icons medium white-text add-item-icon">add_circle_outline</i></div>
                                      :<div className="card blue-grey lighten-2 add-item-card"><i className="material-icons medium white-text add-item-icon">add_circle_outline</i></div>}
                </Link>
               
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    const todoList = ownProps.todoList;
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
)(ItemsList);