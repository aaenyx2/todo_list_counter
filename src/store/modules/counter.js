// 리덕스 모듈을 생성

import { createAction, handleActions } from 'redux-actions';

// 액션 타입을 정의
const INCREMENT = 'counter/INCREMENT';
const DECREMENT = 'counter/DECREMENT';

// redux-actions의 createAction 메소드를 이용해 액션 생성 함수를 만듬
export const increment = createAction(INCREMENT);
// 상기 코드는  export const increment = () => ({ type: INCREMENT }); 와 같다.
export const decrement = createAction(DECREMENT);

// 모듈의 초기 상태를 정의
const initialState = {
  number: 0
};

// handleAction 메소드를 사용해 리듀서 만들기. 
// 리듀서와 액션이 한 파일에 정의되어 있는 형식을 Ducks 구조라고 함.

// handleActions 의 첫번째 파라미터로 액션을 처리하는 함수들로 이뤄진 객체를 입력

export default handleActions({
  [INCREMENT]: (state, action) => {
    return { number: state.number + 1 };
  },
  // action 객체를 참조하지 않으니까 이렇게 생략을 할 수도 있겠죠?
  // state 부분에서 비구조화 할당도 해주어서 코드를 더욱 간소화시켰습니다.
  [DECREMENT]: ({ number }) => ({ number: number - 1 })
}, initialState); // 두번째 파라미터로는 state의 상태를 입력.
