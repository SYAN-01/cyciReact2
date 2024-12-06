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
        return <div>Loading...</div>; // 로딩 중일 때 표시
    }

    return (
        <div>
            <h1>{board.title}</h1>
            <p>{board.content}</p>
            <p><strong>작성자:</strong> {board.memberId}</p>
            <p><strong>추천 수:</strong> {board.boardGood}</p>
            <p><strong>작성일:</strong> {new Date(board.createdAt).toLocaleString()}</p>

            <div>
                {/* 추천 버튼 */}
                <button onClick={handleGoodUp}>추천</button>
                {/* 삭제 버튼 */}
                <button onClick={handleDelete}>삭제</button>
                {/* 수정 버튼 */}
                <button onClick={handleEdit}>수정</button>
            </div>
        </div>
    );
}
