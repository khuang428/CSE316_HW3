import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { NavLink, Redirect } from 'react-router-dom';
import { firestoreConnect } from 'react-redux-firebase';
import TodoListLinks from './TodoListLinks'
import { getFirestore } from 'redux-firestore';
import { createTodoListHandler } from '../../store/database/asynchHandler';

class HomeScreen extends Component {

    handleNewList = () =>{
        const fireStore = getFirestore();
        fireStore.collection('todoLists').add({
            name : '',
            owner: '',
            time_updated:0,
            todoList: {}
        }).then(ref => {
            this.props.history.push('/todoList/'+ref.id);
        });
    }

    render() {
        if (!this.props.auth.uid) {
            return <Redirect to="/login" />;
        }

        return (
            <div className="dashboard container">
                <div className="row">
                    <div className="col s12 m4">
                        <TodoListLinks />
                    </div>

                    <div className="col s8">
                        <div className="banner">
                            @todo<br />
                            List Maker
                        </div>
                        
                        <div className="home_new_list_container center">
                                <button className="blue-grey white-text waves-effect waves-light btn-large home_new_list_button" onClick={this.handleNewList}>
                                    Create a New To Do List
                                </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.firebase.auth
    };
};

export default compose(
    connect(mapStateToProps),
    firestoreConnect([
      { collection: 'todoLists' , orderBy: ['time_updated', 'desc']},
    ]),
)(HomeScreen);