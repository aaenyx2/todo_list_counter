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
  increment: () => dispatch(counterActions.increment()), // store/modules/counter를 counterActions 라는 이름으로 import해온 뒤 
  // 그 안에서 정의된 increment라는 함수를 createActions.increment() 라는 코드로 호출했음.
  decrement: () => dispatch(counterActions.decrement())
  
  // 상기 두 코드를 (dispatch) => bindActionCreators(counterActions, dispatch)로 간략화 가능
})

// 컴포넌트를 리덕스와 연동 할 떄에는 connect 를 사용.
// connect() 의 결과는, 컴포넌트에 props 를 넣어주는 함수를 반환.
// 반환된 함수에 우리가 만든 컴포넌트를 넣어주자.
export default connect(mapStateToProps, mapDispatchToProps)(CounterContainer);





// connect 함수 안에 mapStateToProps 메소드와 mapDispatchToProps 메소드를 바로 정의해줘도 됨

// export default connect(
//   (state) => ({
//     number: state.counter.number
//   }), 
//   (dispatch) => ({
//     increment: () => dispatch(counterActions.increment()),
//     decrement: () => dispatch(counterActions.decrement())
//   })
// )(CounterContainer);

