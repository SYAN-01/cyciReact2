import React, { useState } from "react";
import { createBoard } from "../api/boardapi"; // createBoard API 임포트
import { useNavigate } from "react-router-dom"; // 페이지 이동을 위한 useNavigate 훅 임포트

export default function AddBoardPage() {
    const [newBoard, setNewBoard] = useState({ title: "", content: "" });
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수

    const handleCreateBoard = () => {
        if (!newBoard.title || !newBoard.content) {
            alert("제목과 내용을 입력해주세요.");
            return;
        }

        createBoard({ ...newBoard, memberId: "hong" }) 
            .then((response) => {
                if (response.data.code === "200") {
                    alert("게시글이 등록되었습니다.");
                    navigate("/boardlist"); 
                } else {
                    console.error("게시글 등록 오류", response.data);
                    alert("게시글 등록에 실패했습니다.");
                }
            })
            .catch((error) => {
                console.error("API 오류:", error);
                alert("서버에 문제가 발생했습니다. 나중에 다시 시도해주세요.");
            });
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>게시글 추가</h1>
                <div style={styles.form}>
                    <input
                        type="text"
                        placeholder="제목을 입력하세요"
                        value={newBoard.title}
                        onChange={(e) =>
                            setNewBoard({ ...newBoard, title: e.target.value })
                        }
                        style={styles.input}
                    />
                    <textarea
                        placeholder="내용을 입력하세요"
                        value={newBoard.content}
                        onChange={(e) =>
                            setNewBoard({ ...newBoard, content: e.target.value })
                        }
                        style={styles.textarea}
                    ></textarea>
                    <div style={styles.buttonContainer}>
                        <button onClick={handleCreateBoard} style={styles.submitButton}>
                            등록
                        </button>
                        <button onClick={() => navigate("/boardlist")} style={styles.cancelButton}>
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
        backgroundColor: '#28a745',
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
