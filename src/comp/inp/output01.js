import { useEffect, useState } from "react";

export default function OutStudy() {

    const [메세지, 변경메세지] = useState('');

    function start() {
        const data = localStorage.getItem('study');
        if(data !== '' && data !== 'null') {
            변경메세지(data);
        }
    }


    //처음 화면이 마운트 되었을 때 ( java 이벤트 헨들러: onLoad하고 비슷하다. )
    useEffect(() => {
        start();
    }, [])

    return (
        <div>
            <h1>Out Study</h1>
            {메세지}
        </div>
    )
}