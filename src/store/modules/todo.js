import { createAction, handleActions } from 'redux-actions';
import { Map, List } from 'immutable';

const CHANGE_INPUT = 'todo/CHANGE_INPUT';
const INSERT = 'todo/INSERT';
const TOGGLE = 'todo/TOGGLE';
const REMOVE = 'todo/REMOVE';

export const changeInput = createAction(CHANGE_INPUT, value => value);
export const insert = createAction(INSERT, text => text);
export const toggle = createAction(TOGGLE, id => id);
export const remove = createAction(REMOVE, id => id);

let id = 0; // todo 아이템에 들어갈 고유 값 초기화. 나중엔 데이터베이스에 등록해두면 되겠지.

    const initialState = Map({
    input: '',
    todos: List()
    });

export default handleActions({
    [CHANGE_INPUT]: (state, action) => state.set('input', action.payload),
    [INSERT]: (state, { payload: text }) => {
    // action 객체를 비구조화 할당하고, payload 값을 text 라고 부르겠다는 뜻
    const item = Map({ id: id++, checked: false, text }); 
    // 하나 추가 할 때마다 id 값을 증가. 후위연산자
    return state.update('todos', todos => todos.push(item));
    },
    [TOGGLE]: (state, { payload: id }) => {
    // id 값을 가진 index 를 찾아 checked 값을 반전
    const index = state.get('todos').findIndex(item => item.get('id') === id);
    return state.updateIn(['todos', index, 'checked'], checked => !checked);
    },
    [REMOVE]: (state, { payload: id }) => {
    // id 값을 가진 index 를 찾아서 지움
    const index = state.get('todos').findIndex(item => item.get('id') === id);
    return state.deleteIn(['todos', index]);
    }
}, initialState);