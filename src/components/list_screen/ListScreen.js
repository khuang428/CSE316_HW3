import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { compose } from 'redux';
import ItemsList from './ItemsList.js'
import { firestoreConnect } from 'react-redux-firebase';
import { getFirestore } from 'redux-firestore';
import Modal from 'react-materialize/lib/Modal';
import Button from 'react-materialize/lib/Button';

class ListScreen extends Component {
    state = {
        name: '',
        owner: '',
    }

    handleChange = (e) => {
        const { target } = e;

        this.setState(state => ({
            ...state,
            [target.id]: target.value,
        }));

        const fireStore = getFirestore();
        fireStore.collection('todoLists').doc(this.props.todoList.id).update({[target.id]:target.value});
    }

    handleDelete = (e) => {
        const fireStore = getFirestore();
        fireStore.collection("todoLists").doc(this.props.todoList.id).delete();
        this.props.history.push("/");
    }

    render() {
        const auth = this.props.auth;
        const todoList = this.props.todoList;
        if (!auth.uid) {
            return <Redirect to="/" />;
        }
        return (
            <div className="container">
                <div className = "row">
                    <h4 className="grey-text text-darken-3 col s11">Todo List</h4>
                    <Modal header="Delete List?" options={{dismissible: false}} trigger={<i className="delete-list material-icons medium right">delete_forever</i>}
                    actions={[<Button className="blue-grey darken-1" onClick={this.handleDelete} modal="close">Yes</Button>,<Button className="blue-grey darken-1" modal="close">No</Button>]}>
                        <p>
                            Are you sure you want to delete this list?
                        </p>
                        <p className = "bold-text">
                            The list will not be retrievable.
                        </p>
                    </Modal>
                </div>

                <div className="input-field">
                    <label htmlFor="email" className="active">Name</label>
                    <input type="text" name="name" id="name" onChange={this.handleChange} value={todoList.name} />
                </div>
                <div className="input-field">
                    <label htmlFor="password" className="active">Owner</label>
                    <input type="text" name="owner" id="owner" onChange={this.handleChange} value={todoList.owner} />
                </div>
                <ItemsList todoList={todoList} />
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
  const { id } = ownProps.match.params;
  const { todoLists } = state.firestore.data;
  const todoList = todoLists ? todoLists[id] : null;
  todoList.id = id;

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