import axios from 'axios'
import { useRef, useState } from 'react';

export default function Ax1() {

    const [지역, 변경지역] = useState([]);
    const text = useRef(); // 변수를 가상 dom에만 저장을 하고요. 랜더 현상 x.
    // 사용자에게 변화 되는 데이터를 보여줄 필요가 없지만.
    // 데이터는 저장

    const text2 = useRef();

    function axios01() {
        console.log('==== axios get 방식'); //키보드 이슈 심각하다.


        axios.get('http://localhost:8080/api/area/list')
        .then(res => {
            console.log(res);
            if(res.data.code === '200') {
                변경지역(res.data.data);
            }
        })

        // Promise 라는 JavaScript 기능하고 비슷.
        // ES 6 문법.
        //
    }

    //useRef

    function axios2() {
        // document.getElementById('aaa')  == text.current
        console.log(text.current.value);

        const obj = {
            id: '1'
        }

        console.log(obj);

        axios.get('http://localhost:8080/api/area/byId', {params: {
            id: '1'
        }}) 
        .then(res => {
            console.log(res);
        })

    }

    function axios3() {
        axios.post('http://localhost:8080/api/member/list')
        .then( res => {
            console.log(res);
        })
    }

    function axios4()  {
        const obj = {
            "id": text2.current.value
        } // { "id": "hello World"}
        axios.post('http://localhost:8080/api/member/findId', JSON.stringify(obj)
        , {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        )
        .then(res => {
            console.log(res);
        })
    }



    return (
        <div>
            <h1>Axios 연습</h1>
            <h4>Get 방식</h4>
            <input type='button' onClick={axios01} value='get방식' /><br/>
            <input type='text' ref={text} ></input>
            <input type='button' onClick={axios2} value='get방식 2' />
            <h4>Post 방식</h4>
            {/* method // 전송 방법: method, GET, POST ( TOMCAT은 GET, POST만 지원 ) */}

            <input type='button' onClick={axios3} value='post 방식' /><br/>
            <input type='text' ref={text2} />
            <input type='button' onClick={axios4} value='post 방식 2' />


        </div>
    )
}