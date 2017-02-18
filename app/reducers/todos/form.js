import { createAction } from 'redux-actions';

const TODO_FORM_TEXT = 'TODO_FORM_TEXT';
const TODO_FORM_RESET = 'TODO_FORM_RESET';

const $$initialState = {
  text: '',
  completed: false
};

export default function form($$state = $$initialState, { type, payload }) {
  switch (type) {
    case TODO_FORM_TEXT:
      return { ...$$state, text: payload };
    case TODO_FORM_RESET:
      return { ...$$initialState };
    default:
      return $$state;
  }
}

export const todoFormText = createAction(TODO_FORM_TEXT);
export const todoFormReset = createAction(TODO_FORM_RESET);

export function selectForm(state) {
  return state.todos.form;
}