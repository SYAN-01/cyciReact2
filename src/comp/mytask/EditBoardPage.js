import React, { useState, useEffect } from "react";
import { fetchBoardDetail, modifyBoard } from "../api/boardapi"; // 수정: 'updateBoard' -> 'modifyBoard'
import { useParams, useNavigate } from "react-router-dom"; // URL 파라미터와 페이지 이동을 위한 useParams, useNavigate 임포트

export default function EditBoardPage() {
    const { boardId } = useParams(); // URL에서 boardId 가져오기
    const navigate = useNavigate();
    const [board, setBoard] = useState({ title: "", content: "" });

    // 게시글 상세 조회
    useEffect(() => {
        fetchBoardDetail(boardId)
            .then((response) => {
                if (response.data.code === "200") {
                    setBoard(response.data.data); // 기존 게시글 데이터로 state 초기화
                } else {
                    console.error("게시글 상세 조회 실패");
                }
            })
            .catch((error) => console.error("API Error:", error));
    }, [boardId]);

    // 수정된 게시글 저장
    const handleUpdateBoard = () => {
        const updatedBoardData = { boardId, ...board }; // boardId와 board 데이터를 합쳐 하나의 객체로 만듦
        modifyBoard(updatedBoardData) // 게시글 수정 API 호출 (modifyBoard 사용)
            .then(() => {
                alert("게시글이 수정되었습니다.");
                navigate(`/boarddetail/${boardId}`); // 수정 후 상세 페이지로 이동
            })
            .catch((error) => {
                console.error("게시글 수정 실패:", error);
                alert("게시글 수정에 실패했습니다.");
            });
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>게시글 수정</h1>
                <div style={styles.form}>
                    <input
                        type="text"
                        placeholder="제목을 입력하세요"
                        value={board.title}
                        onChange={(e) => setBoard({ ...board, title: e.target.value })}
                        style={styles.input}
                    />
                    <textarea
                        placeholder="내용을 입력하세요"
                        value={board.content}
                        onChange={(e) => setBoard({ ...board, content: e.target.value })}
                        style={styles.textarea}
                    ></textarea>
                    <div style={styles.buttonContainer}>
                        <button onClick={handleUpdateBoard} style={styles.submitButton}>
                            수정
                        </button>
                        <button onClick={() => navigate(`/boarddetail/${boardId}`)} style={styles.cancelButton}>
                            취소
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

// 스타일 객체
const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f4f7fc',
        padding: '20px',
    },
    card: {
        backgroundColor: 'white',
        width: '100%',
        maxWidth: '600px',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
    },
    title: {
        fontSize: '2em',
        marginBottom: '20px',
        color: '#333',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    },
    input: {
        padding: '12px',
        fontSize: '1em',
        borderRadius: '8px',
        border: '1px solid #ccc',
        outline: 'none',
        transition: 'border-color 0.3s',
    },
    textarea: {
        padding: '12px',
        fontSize: '1em',
        borderRadius: '8px',
        border: '1px solid #ccc',
        outline: 'none',
        height: '200px',
        resize: 'none',
        transition: 'border-color 0.3s',
    },
    buttonContainer: {
        display: 'flex',
        gap: '20px',
        justifyContent: 'center',
    },
    submitButton: {
        padding: '12px 30px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '1.1em',
        transition: 'background-color 0.3s',
    },
    cancelButton: {
        padding: '12px 30px',
        backgroundColor: '#6c757d',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '1.1em',
        transition: 'background-color 0.3s',
    },
};
