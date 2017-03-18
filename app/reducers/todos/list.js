import { fork, put, call, select, takeEvery } from 'redux-saga/effects';
import { createAction } from 'redux-actions';
import { AsyncStorage } from 'react-native';
import uuid4 from 'uuid/v4';
import Todos from '../../api/todos'
import { append, removeByKey, replace } from '../../helpers/ramda';
import { selectForm, todoFormReset } from './form';

const todosModel = new Todos();

const TODO_DELETE = 'TODO_DELETE';
const TODO_DESTROY = 'TODO_DESTROY';
const TODO_TOGGLE = 'TODO_TOGGLE';
const TODO_CREATE = 'TODO_CREATE';
const TODO_UPDATE = 'TODO_UPDATE';
const TODO_RESET = 'TODO_RESET';
const TODO_ADD = 'TODO_ADD';
const TODOS_FETCH = 'TODOS_FETCH';
const TODOS_RESET = 'TODOS_RESET';
const TODOS_COMPLETE_ALL = 'TODOS_COMPLETE_ALL';
const TODOS_CLEAR_COMPLETED = 'TODOS_CLEAR_COMPLETED';

const $$initialState = [];

export default function list($$state = $$initialState, { type, payload }) {
  switch (type) {
    case TODO_ADD:
      return append($$state, payload);
    case TODO_DESTROY:
      return removeByKey($$state, payload);
    case TODO_RESET:
      return replace($$state, [payload]);
    case TODOS_RESET:
      return payload;
    default:
      return $$state;
  }
}

export const createTodo = createAction(TODO_CREATE);

export const addTodo = createAction(TODO_ADD);

export const resetTodos = createAction(TODOS_RESET);

export const updateTodo = createAction(TODO_UPDATE);

export const toggleTodo = createAction(TODO_TOGGLE);

export const resetTodo = createAction(TODO_RESET);

export const deleteTodo = createAction(TODO_DELETE);

export const destroyTodo = createAction(TODO_DESTROY);


function getTodos(state) {
  return state.todos.list;
}

function getTodo(state, id) {
  return state.todos.list.find((item) => item.id === id);
}

function* createTodoAction() {
  try {
    const id = uuid4();
    const data = yield select(selectForm);
    const todo = {
      ...data,
      id
    };

    yield put(addTodo(todo));
    yield put(todoFormReset());
    console.log(1);
    yield todosModel.create(todo);
    console.log(2);
  } catch (e) {
    console.log(e.message);
  }
}

function* updateTodosStorage() {
  const todos = yield select(getTodos);
  yield call(AsyncStorage.setItem, `@state:todos`, JSON.stringify(todos));
}

function* todosListRestoreAction() {
  try {
    const json = yield call(AsyncStorage.getItem, '@state:todos');
    const data = JSON.parse(json);
    if (data) {
      yield put(resetTodos(data));
    }
  } catch (e) {
    console.log(e.message);
  }
}

function* updateTodoAction({ payload: { id, text = '', completed = false } }) {
  const todo = { id, text, completed };
  yield put(resetTodo(todo));
  yield call(updateTodosStorage);
  yield  todosModel.update(todo.id, todo);
}

function* toggleTodoAction({ payload }) {
  const todo = yield select(getTodo, payload);
  todo.completed = !todo.completed;
  yield put(updateTodo(todo));
}

function* deleteTodoAction({ payload }) {
  yield put(destroyTodo(payload));
  yield call(updateTodosStorage);
  yield todosModel.remove(payload);
}

function* fetchTodosAction() {
  const data = yield call(todosModel.all);
  yield call(updateTodosStorage);
  yield put(resetTodos(data))
}

export function* todosList() {
  yield call(todosListRestoreAction);
  yield fork(takeEvery, TODO_CREATE, createTodoAction);
  yield fork(takeEvery, TODO_TOGGLE, toggleTodoAction);
  yield fork(takeEvery, TODO_UPDATE, updateTodoAction);
  yield fork(takeEvery, TODO_DELETE, deleteTodoAction);
  yield fork(takeEvery, TODO_ADD, updateTodosStorage);
  yield fork(takeEvery, TODOS_FETCH, fetchTodosAction);
}
