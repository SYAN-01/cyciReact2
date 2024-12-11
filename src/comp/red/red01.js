import { useReducer } from "react";
import { useState } from "react"

//함수 공식 명칭은 reducer.
//status: 첫 번재 인자값 (oldStatus), 호출 되었을 때 reducer에 담겨 있는 값.
//action: reducer를 호출 (해당 행위 명칭은 action )이 되었을 때, action에 값이 들어 온다.
// reducer 함수는 action의 값을 확인해서 status의 값을 변경한다.
function changeTest(status, action) {
    console.log('status: ', status);
    console.log(`action: ${action}`);

    switch(action) {
        case 'up':
            return status+1;
        case 'down':
            return status-1;
        case 'reset':
            return 0;
    }

    return status;
}


export default function Red01() {

    const [data, setData] = useState(0);
    const [test, setTest] = useReducer(changeTest, 0);

    return (
        <div>
            <h1>Reducer 01</h1>
            {data}
            <input type="button" value="증가"
            onClick={e=> {
                setData(data+1)
            }} />
            <input type="button" value="감소"
            onClick={e=> {
                setData(data-1)
            }} /> <br/><br/><br/>
            {test}
            <input type="button" value="증가"
            onClick={e=> {
                setTest('up');
            }} />
            <input type="button" value="감소"
            onClick={e=> {
                setTest('down');
            }} />
            <input type="button" value="reset"
            onClick={e=> {
                setTest('reset');
            }} />
            <br/>

        </div>
    )
}