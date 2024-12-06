import React from 'react';

export default function BoardArea({ board }) {
    return (
        <div
            style={{
                border: '1px solid gray',
                padding: '10px',
                marginBottom: '10px',
            }}
        >
            <h3>{board.title}</h3>
            <p>작성자: {board.memberId}</p>
            <p>추천: {board.boardGood}</p>
            <p>작성일: {new Date(board.createdAt).toLocaleString()}</p>
        </div>
    );
}
