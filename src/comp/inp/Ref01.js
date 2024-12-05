import { useRef, useState } from "react"

export default function Study() {

    let data = 0;
    const [값1, 변경값1] = useState(0);     // useState
    const 값2 = useRef(0);                 //useRef

    const [msg, setMsg] = useState('주인이오면 잘 되는거야?');
    function 언제고장나나() {
        console.log('1');
        console.log('2');
        console.log('3');
        console.log(msg);
    
    }

    return (
        <div>
            <h3>useState</h3>
                <input type='button' value='값 증가' onClick={
                    () => {
                        변경값1(값1+1);
                        console.log('state: ', 값1);
                    }
                }/>{값1}
            <h3>useRef</h3>
                <input type='button' value='값 증가' onClick={
                    () => {
                        값2.current++;
                        console.log('ref: ', 값2);
                    }
                }/>{값2.current}
            <h3>js</h3>
                <input type='button' value='값 증가' onClick={
                    () => {
                        data++;
                        console.log('js: ', data);
                    }
                }/>{data}

                <h3>
                    TEST
                </h3>

        </div>
    )
}