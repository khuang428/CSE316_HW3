import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import ItemCard from './ItemCard';
import { firestoreConnect } from 'react-redux-firebase';

class ItemsList extends React.Component {
    render() {
        const todoList = this.props.todoList;
        const items = todoList.items;
        console.log("ItemsList: todoList.id " + todoList.id);
        return (
            <div className="todo-lists section">
                <div className="card z-depth-1 blue-grey darken-1">
                    <div className="card-content white-text row">
                        <div className="card-title col s4">Description</div>
                        <div className="card-title col s3">Due Date</div>
                        <div className="card-title col s3">Status</div>
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
                <div className="container blue-grey"></div>
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