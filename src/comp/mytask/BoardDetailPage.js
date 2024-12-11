import React, { useState, useEffect } from "react";
import { fetchBoardDetail, recommendBoard, deleteBoard } from "../api/boardapi"; // 게시글 상세 조회, 추천, 삭제 API 임포트
import { useParams, useNavigate } from "react-router-dom"; // URL 파라미터와 페이지 이동을 위한 useParams, useNavigate 임포트

export default function BoardDetailPage() {
    const { boardId } = useParams(); // URL에서 boardId 가져오기
    const navigate = useNavigate(); // 페이지 이동을 위한 navigate 함수
    const [board, setBoard] = useState(null);

    // 게시글 상세 조회
    useEffect(() => {
        fetchBoardDetail(boardId)
            .then((response) => {
                if (response.data.code === "200") {
                    setBoard(response.data.data); // 응답 데이터를 state에 저장
                } else {
                    console.error("게시글 상세 조회 실패");
                }
            })
            .catch((error) => {
                console.error("API Error:", error);
            });
    }, [boardId]); // boardId가 변경될 때마다 호출

    // 추천 처리
    const handleGoodUp = () => {
        recommendBoard(boardId)
            .then(() => {
                setBoard((prevBoard) => ({
                    ...prevBoard,
                    boardGood: prevBoard.boardGood + 1, // 추천 수 증가
                }));
            })
            .catch((error) => console.error("추천 처리 실패:", error));
    };

    // 삭제 처리
    const handleDelete = () => {
        deleteBoard(boardId)
            .then(() => {
                alert("게시글이 삭제되었습니다.");
                navigate("/boardlist"); // 삭제 후 게시글 목록으로 이동
            })
            .catch((error) => console.error("게시글 삭제 실패:", error));
    };

    // 수정 페이지로 이동
    const handleEdit = () => {
        navigate(`/editboard/${boardId}`); // 수정 페이지로 이동
    };

    if (!board) {
        return <div style={styles.loading}>Loading...</div>; // 로딩 중일 때 표시
    }

    // 작성자가 "hong"일 경우에만 수정/삭제 버튼을 활성화
    const isOwner = board.memberId === "hong"; 

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <h1 style={styles.title}>{board.title}</h1>
                <div style={styles.metaInfo}>
                    <p><strong>작성자:</strong> {board.memberId}</p>
                    <p><strong>작성일:</strong> {new Date(board.createdAt).toLocaleString()}</p>
                    <p><strong>추천 수:</strong> {board.boardGood}</p>
                </div>
                <div style={styles.content}>{board.content}</div>

                <div style={styles.buttonContainer}>
                    {/* 추천 버튼 */}
                    <button onClick={handleGoodUp} style={styles.recommendButton}>추천</button>

                    {/* 수정 및 삭제 버튼: 작성자가 "hong"일 경우만 활성화 */}
                    {isOwner && (
                        <>
                            <button onClick={handleDelete} style={styles.deleteButton}>삭제</button>
                            <button onClick={handleEdit} style={styles.editButton}>수정</button>
                        </>
                    )}

                    {/* 게시판으로 가기 버튼 */}
                    <button onClick={() => navigate("/boardlist")} style={styles.goToBoardButton}>게시판으로 가기</button>
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
        maxWidth: '800px',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
        textAlign: 'center',
    },
    title: {
        fontSize: '2em',
        marginBottom: '15px',
        color: '#333',
    },
    metaInfo: {
        fontSize: '1em',
        color: '#555',
        marginBottom: '20px',
        textAlign: 'left',
    },
    content: {
        fontSize: '1.2em',
        lineHeight: '1.6',
        marginBottom: '20px',
        color: '#444',
        textAlign: 'left',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'space-around',
        gap: '15px',
        marginTop: '20px',
    },
    recommendButton: {
        padding: '12px 25px',
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    deleteButton: {
        padding: '12px 25px',
        backgroundColor: '#dc3545',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    editButton: {
        padding: '12px 25px',
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    goToBoardButton: {
        padding: '12px 25px',
        backgroundColor: '#6c757d',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s',
    },
    loading: {
        textAlign: 'center',
        fontSize: '1.5em',
        color: '#777',
    }
};
