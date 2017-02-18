import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Todos from '../../components/Todos/Todos';
import { toggleTodo, deleteTodo } from '../../reducers/todos/list';

class TodosContainer extends Component {
  render() {
    return (
      <Todos {...this.props} />
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todos: state.todos.list
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggle: (id) => {
      dispatch(toggleTodo(id));
    },
    destroy: (id) => {
      dispatch(deleteTodo(id));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TodosContainer);