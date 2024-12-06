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
        <div>
            <h1>게시글 수정</h1>
            <input
                type="text"
                placeholder="제목"
                value={board.title}
                onChange={(e) => setBoard({ ...board, title: e.target.value })}
            />
            <textarea
                placeholder="내용"
                value={board.content}
                onChange={(e) => setBoard({ ...board, content: e.target.value })}
            ></textarea>
            <button onClick={handleUpdateBoard}>수정</button>
        </div>
    );
}
