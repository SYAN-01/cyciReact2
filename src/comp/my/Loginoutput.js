import React from 'react';
import { useNavigate } from 'react-router-dom';

function LoginResult() {
    const navigate = useNavigate();

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>로그인 성공</h1>
            <p>환영합니다! 로그인에 성공하셨습니다.</p>
        </div>
    );
}

export default LoginResult;
