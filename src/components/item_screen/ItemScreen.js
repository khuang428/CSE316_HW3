import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import { Link } from 'react-router-dom';

class ItemScreen extends Component{
    state = {
        description: this.props.item.description,
        assigned_to: this.props.item.assigned_to,
        due_date: this.props.item.due_date,
        completed: this.props.item.completed
    }

    handleChange = (e) =>{
        const { target } = e;
        if(target.id != "completed"){
            this.setState(state => ({
                ...state,
                [target.id]: target.value,
            })); 
        }else{
            this.setState(state => ({
                ...state,
                [target.id]: target.checked,
            }));
        }
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        let listToEdit = this.props.todoList.items;
        let itemToEdit = listToEdit[this.props.item.id];
        itemToEdit.description = this.state.description;
        itemToEdit.assigned_to = this.state.assigned_to;
        itemToEdit.due_date = this.state.due_date;
        itemToEdit.completed = this.state.completed;
        const fireStore = getFirestore();
        console.log(this.props.todoList.id);
        fireStore.collection("todoLists").doc(this.props.todoList.id).update({items:listToEdit});
        this.props.history.go(-1);
    }

    render() {
        const auth = this.props.auth;
        const item = this.props.item;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }

        return (
            <form>
                <div className="container">
                <h4 className="grey-text text-darken-3">Edit Item</h4>
                <div className="input-field">
                    <label htmlFor="description" className="active">Description</label>
                    <input type="text" name="description" id="description" onChange={this.handleChange} value={this.state.description} />
                </div>
                <div className="input-field">
                    <label htmlFor="assigned_to" className="active">Assigned To</label>
                    <input type="text" name="assigned_to" id="assigned_to" onChange={this.handleChange} value={this.state.assigned_to} />
                </div>
                <div className="input-field">
                    <label htmlFor="due_date" className="active">Due Date</label>
                    <input type="date" name="due_date" id="due_date" onChange={this.handleChange} value={this.state.due_date} />
                </div>
                <div>
                    <label htmlFor="completed" className="active">
                        <input type="checkbox" className = "colored-checkbox filled-in" name="completed" id="completed" onChange={this.handleChange} checked={this.state.completed} />
                        <span>Completed</span>
                    </label>
                </div>
                <br></br>
                <button className="blue-grey darken-1 waves-effect waves-light btn" onClick={this.handleSubmit}>Submit<i className="material-icons right">check</i></button>
                <Link className = "white-text" to={'/todoList/' + this.props.todoList.id} key={this.props.todoList.id}>
                    <button className="blue-grey darken-1 waves-light btn">Cancel<i className="material-icons right">close</i></button>
                </Link>
                
            </div>
            </form>
            
        );
    }
    
}
const mapStateToProps = (state, ownProps) => {
    const { todoLists } = state.firestore.data;
    const { id } = ownProps.match.params;
    const todoList = todoLists ? todoLists[id] : null;
    const{ itemid } = ownProps.match.params;
    const item = todoList.items[itemid];
    todoList.id = id;
    item.id = itemid;
    return {
        item,
        todoList,
        auth: state.firebase.auth,
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'todoLists' },
    ]),
  )(ItemScreen);