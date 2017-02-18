import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import Form from '../../components/Todos/Form';
import { createTodo } from '../../reducers/todos/list';
import { todoFormText } from '../../reducers/todos/form';

class TodosFormContainer extends Component {
  static propTypes = {
    form: PropTypes.object,
    createTodo: PropTypes.func,
    todoFormText: PropTypes.func
  };

  render() {
    return (
      <Form {...this.props} />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    form: state.todos.form
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createTodo(params) {
      return dispatch(createTodo(params));
    },
    todoFormText(text) {
      return dispatch(todoFormText(text));
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TodosFormContainer);