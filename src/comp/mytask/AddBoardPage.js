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

        // 게시글 추가 요청 (memberId는 "hong"으로 고정)
        createBoard({ ...newBoard, memberId: "hong" }) // memberId를 "hong"으로 고정
            .then((response) => {
                if (response.data.code === "200") {
                    alert("게시글이 등록되었습니다.");
                    navigate("/boardlist"); // 게시글 목록 페이지로 이동
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
        <div>
            <h1>게시글 추가</h1>
            <input
                type="text"
                placeholder="제목"
                value={newBoard.title}
                onChange={(e) => setNewBoard({ ...newBoard, title: e.target.value })}
            />
            <textarea
                placeholder="내용"
                value={newBoard.content}
                onChange={(e) =>
                    setNewBoard({ ...newBoard, content: e.target.value })
                }
            ></textarea>
            <button onClick={handleCreateBoard}>등록</button>
            <button onClick={() => navigate("/boardlist")}>취소</button>
        </div>
    );
}
