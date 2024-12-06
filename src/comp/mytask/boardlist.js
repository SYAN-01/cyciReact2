import React, { useState, useEffect } from "react";
import BoardArea from "./BoardArea";
import { fetchBoards } from "../api/boardapi"; // 추천 및 삭제 관련 API는 제외
import { useNavigate } from "react-router-dom";

export default function BoardList() {
    const [boards, setBoards] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태
    const navigate = useNavigate();

    // 게시글 목록 불러오기
    useEffect(() => {
        fetchBoards({})
            .then((response) => {
                if (response.data.code === "200") {
                    setBoards(response.data.data);
                } else {
                    console.error("Error fetching boards");
                }
            })
            .catch((error) => {
                console.error("API Error:", error);
            })
            .finally(() => setLoading(false));
    }, []);

    // 게시글 상세보기 페이지로 이동
    const handleDetail = (boardId) => {
        navigate(`/boarddetail/${boardId}`);
    };

    // 검색어에 맞는 게시글 필터링
    const filteredBoards = boards.filter(board => {
        const title = board.title || "";  // title이 없으면 빈 문자열로 처리
        const content = board.content || ""; // content가 없으면 빈 문자열로 처리
        return title.toLowerCase().includes(searchQuery.toLowerCase()) || // 제목 검색
               content.toLowerCase().includes(searchQuery.toLowerCase()); // 내용 검색
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1>게시글 목록</h1>
            <button onClick={() => navigate("/addboard")}>게시글 추가</button>
            
            {/* 검색 입력창 */}
            <input
                type="text"
                placeholder="검색어를 입력하세요"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // 검색어 입력 시 상태 변경
            />
            
            {filteredBoards.length === 0 ? (
                <div>검색 결과가 없습니다.</div>
            ) : (
                filteredBoards.map((board) => (
                    <div key={board.boardIdx}>
                        <BoardArea board={board} />
                        {/* 자세히 보기 버튼 */}
                        <button onClick={() => handleDetail(board.boardIdx)}>
                            자세히 보기
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}
