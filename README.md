- [template](https://github.com/vlpt-playground/begin-redux/tree/template): 실습을 빠르게 진행하기 위한 템플릿
- [01](https://github.com/vlpt-playground/begin-redux/tree/01): 카운터 (기본)
- [02](https://github.com/vlpt-playground/begin-redux/tree/02): 카운터 (코드 정리)
- [03](https://github.com/vlpt-playground/begin-redux/tree/03): 투두리스트 (기본)
- [04](https://github.com/vlpt-playground/begin-redux/tree/04): 투두리스트 (Immutable Record 사용)
- [05](https://github.com/vlpt-playground/begin-redux/tree/05): actionCreator 미리 bind하기
- [06](https://github.com/vlpt-playground/begin-redux/tree/06): immer.js 사용해보기
- [07](https://github.com/vlpt-playground/begin-redux/tree/06): MobX 로 구현해보기
- [08](https://github.com/vlpt-playground/begin-redux/tree/06): MobX 로 구현해보기 (Store 분리)

## 템플릿에 이미 이뤄진 작업:

### 0. 절대경로에서 파일을 불러 올 수 있도록 설정

- .env: NODE_PATH 설정
- jsconfig.json: 에디터 설정

### 1. 패키지 설치
```bash
$ yarn add redux react-redux redux-actions immutable
```

### 3. 주요 컴포넌트 생성 및 루트 컴포넌트 생성

- components/
  - App.js
  - AppTemplate.js
  - Counter.js
  - Todos.js
- containers/
  - CounterContainer.js
  - TodosContainer.js
- Root.js

### 4. 리덕스 관련 코드를 작성 할 파일 생성
- store
  - modules
    - counter.js
    - todo.js
    - index.js
  - configure.js
  - index.js
  - actionCreators.js


  #######################


  1. src 폴더 안에 redux 데이터를 사용하는 components가 들어가는 'containers',
                  redux 데이터를 사용하지 않는 components가 들어가는 'components',
                  redux 모듈 코드를 작성할  'store' 디렉토리를 각각 만들어준다.
                  를 각각 만들어 준다.

  2.  store/modules 함수를 만들고 이 안에서 액션 생성 함수, reducer 함수 등을 생성,            initialState를 정의하면 된다. (Ducks 구조)

  3. 액션 생성 함수를 생성. 다른 파일에서 불러와야 하므로 export 해준다.

  -  export const increment = () => ({ type: INCREMENT });

  4. 액션 생성 함수 만드는 모듈을 import 한 후에는 상기 코드를을 아래와 같이 바꿀 수 있다.

  -  export const increment => createAction(INCREMENT);  

  5. reducer 코드를 handleActions 코드를 사용해서 쉽게 작성할 수 있다.

  6. src/store/modules/index.js(root) 에서 combineReducers 로 리듀서 합치기

  -  보통 한 프로젝트에 여러 개의 reducer가 존재하게 된다.
  -  이 때 이를 combineReducers 메소드를 사용하여
  -  하나로 합칠 수 있다. modules/index.js에서 이를 이용해
  - root reducer를 만들어주자.

  'import { combineReducers } from 'redux';
  import counter from './counter';

  export default combineReducers({
    counter
  });'


  7. store를 만드는 함수 configure 를 store 폴더 안에 만들어서 내보내준다.
  -  createStore를 import하고, 'modules/index.js에서 하나로 합쳐진 통합 리듀서를              createStore의 인자로 넘겨주자. 
      
      import { createStore } from 'redux';
      import modules from './modules';

      configure 함수를 const 형태로 생성하여
  -  createStore(modules)를 반환한 뒤 이를 export default configure로 내보낸다.
      
      const configure = () => {
      // const store = createStore(modules);
      const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() 
      const store = createStore(modules, devTools);

      return store;
    }

    // 구글 react-dev tool을 사용하기 위해 추가해야 할 내용도 위에 적혀 있다.

  8. 방금 만든 store를 store/index.js 에서 받아서 다시 내보내준다
  -  import configure from './configure';
  -  export default configure();

  9.  리액트 앱에 리덕스 적용할 때엔 react-redux 에 들어있는 Provider 를 사용.
      프로젝트의 최상위 컴포넌트인root.js에서 Provider로 렌더 내부 코드를 감싸고
      provider에 store를 넘겨준다.

  10. 리덕스와 연동된 컴포넌트를 container 폴더 안에 만들고 
      이 componet class를 정의한 뒤
      해당 컨테이너의 내용물에 해당하는 component를 import하여 이 안에 return해주고
      export해준다.

  11. 그리고 이 container 컴포넌트를 App에서 불러와서 해당 component를 대체한다.

  12. 이 container 컴포넌트를 리덕스에 연결해준다.
      // 컴포넌트를 리덕스와 연동 할 떄에는 connect 를 사용
      // connect() 의 결과는 컴포넌트에 props 를 넣어주는 함수를 반환
      // 반환된 함수에 우리가 만든 컴포넌트를 넣어주면 됨.

          ex)

          import React, { Component } from 'react';
          import Counter from 'components/Counter';
          import { connect } from 'react-redux';
          import * as counterActions from 'store/modules/counter';

          class CounterContainer extends Component {
            handleIncrement = () => {
              this.props.increment();
            }

            handleDecrement = () => {
              this.props.decrement();
            }
            
            render() {
              const { handleIncrement, handleDecrement } = this;
              const { number } = this.props;

              return (
                <Counter 
                  onIncrement={handleIncrement}
                  onDecrement={handleDecrement}
                  number={number}
                />
              );
            }
          }

          // mapStateToProps 함수를 이용해 props 값으로 넣어 줄 상태를 정의해줌.
          const mapStateToProps = (state) => ({
            number: state.counter.number
          });

          // mapDispatchToProps 함수를 이용해 props 값으로 넣어 줄 액션 함수들을 정의해줌.
          const mapDispatchToProps = (dispatch) => ({
            increment: () => dispatch(counterActions.increment()),
            decrement: () => dispatch(counterActions.decrement())
          })

          // 컴포넌트를 리덕스와 연동 할 떄에는 connect 를 사용.
          // connect() 의 결과는, 컴포넌트에 props 를 넣어주는 함수를 반환.
          // 반환된 함수에 우리가 만든 컴포넌트를 넣어주자.
          export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);

    13. 
    
    (dispatch) => ({
      increment: () => dispatch(counterActions.increment()),
      decrement: () => dispatch(counterActions.decrement())

    이 코드를 

    (dispatch) => bindActionCreators(counterActions, dispatch)

    위와 같이 대체 가능. 대신 최상단에

    import { bindActionCreators } from 'redux';

    위 코드를 추가해줘야 bindActionCreators 메소드를 사용 가능.



    ## 컨테이너 컴포넌트에서 여러 모듈에서 액션 생성 함수를 참조해야 하는 경우

    //

    import React, { Component } from 'react';
    import Counter from 'components/Counter';
    import { connect } from 'react-redux';
    import { bindActionCreators } from 'redux';
    import * as counterActions from 'store/modules/counter'; // counter 모듈의 액션들은 counterAction이라는 이름으로 호출됨.

    class CounterContainer extends Component {
    handleIncrement = () => {
      const { CounterActions } = this.props;
      CounterActions.increment();
    }
    handleDecrement = () => {
      const { CounterActions } = this.props;
      CounterActions.decrement();
    }
    render() {
      const { handleIncrement, handleDecrement } = this;
      const { number } = this.props;

      return (
        <Counter 
          onIncrement={handleIncrement}
          onDecrement={handleDecrement}
          number={number}
        />
      );
    }
  }

  export default connect(
    (state) => ({
      number: state.counter.number
    }), 
    (dispatch) => ({
      CounterActions: bindActionCreators(counterActions, dispatch)
    })
  )(CounterContainer); 




  ------------------------


  to-do list 작성하기


  1. todo module 작성.

  createAction 메소드를 이용해 다양한 액션 생성함수를 만들고 export.

  //src/store/modules/todo.js

    import { createAction } from 'redux-actions';

    const CHANGE_INPUT = 'todo/CHANGE_INPUT';
    const INSERT = 'todo/INSERT';
    const TOGGLE = 'todo/TOGGLE';
    const REMOVE = 'todo/REMOVE';

    export const changeInput = createAction(CHANGE_INPUT);
    export const insert = createAction(INSERT);
    export const toggle = createAction(TOGGLE);
    export const remove = createAction(REMOVE);

    이 때 createAction 메소드는 총 셋이 있는데
    첫번째는 액션이름, 두번째는 payloadCreator, 세번째는 metaCreator 임.

    ex)

    const sample = createAction('SAMPLE', (value) => value + 1, (value) => value - 1);
    sample(1);
    // { type: 'SAMPLE', payload: 2, meta: 0 }


  2. 상기 create 함수의 두번째 인자에다 todo 게시물의 작성, 수정 등에 필요한 text, id 값을 인자로서 받는 함수를 넣어주면 됨.

    ex)

    import { createAction } from 'redux-actions';

    const CHANGE_INPUT = 'todo/CHANGE_INPUT';
    const INSERT = 'todo/INSERT';
    const TOGGLE = 'todo/TOGGLE';
    const REMOVE = 'todo/REMOVE';

    export const changeInput = createAction(CHANGE_INPUT, value => value);
    export const insert = createAction(INSERT, text => text);
    export const toggle = createAction(TOGGLE, id => id);
    export const remove = createAction(REMOVE, id => id); 

    (... 이 아래에는 id값의 초기값, initial state, 그리고 reducer를 정의해주자.)


    3. 액션 정의, 액션 생성 함수를 다 만들었으면 
    id값의 초기값, initial state, 그리고 reducer를 정의해주자.

    // modules/todo.js

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

    let id = 0; // todo 아이템에 들어갈 고유 값 초기화. 
    //나중엔 데이터베이스에 등록해두면 되겠지.

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
        // id 값을 가진 index 를 찾아서 지웁니다.
        const index = state.get('todos').findIndex(item => item.get('id') === id);
        return state.deleteIn(['todos', index]);
        }
    }, initialState);



    4. todo_list의 module을 다 만들었다면, module/index.js에서 combineReducer 안에
      이를 호출해주어 리듀서를 하나로 통합시키자.

      나머지는 counter에 redux를 적용시키는 일과 거의 같다.