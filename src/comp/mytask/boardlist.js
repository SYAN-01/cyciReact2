import React, { useState, useEffect } from "react";
import { fetchBoards } from "../api/boardapi"; // 게시글 목록 가져오기 API
import { useNavigate } from "react-router-dom";

export default function BoardList() {
    const [boards, setBoards] = useState([]);
    const [searchQuery, setSearchQuery] = useState(""); // 검색어 상태
    const [searchBy, setSearchBy] = useState("title"); // 검색 조건 상태 (title 또는 memberId)
    const navigate = useNavigate();

    // 게시글 목록 불러오기
    useEffect(() => {
        fetchBoards({})
            .then((response) => {
                if (response.data.code === "200") {
                    setBoards(response.data.data);
                } else {
                    console.error("게시글 목록 가져오기 실패");
                }
            })
            .catch((error) => {
                console.error("API 오류:", error);
            });
    }, []);

    // 검색 조건에 따라 게시글 필터링
    const filteredBoards = boards.filter((board) => {
        const valueToSearch =
            searchBy === "title" ? board.title || "" : board.memberId || "";
        return valueToSearch.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <div>
            <h1>게시판</h1>
            <div
                style={{
                    marginBottom: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between", // 왼쪽과 오른쪽 정렬
                }}
            >
                {/* 검색 조건 선택 */}
                <div style={{ display: "flex", alignItems: "center" }}>
                    <select
                        value={searchBy}
                        onChange={(e) => setSearchBy(e.target.value)} // 검색 조건 변경
                        style={{
                            padding: "5px",
                            marginRight: "10px",
                            backgroundColor: "#f4f4f4",
                            border: "1px solid #ddd",
                            borderRadius: "3px",
                        }}
                    >
                        <option value="title">제목</option>
                        <option value="memberId">작성자</option>
                    </select>

                    {/* 검색 입력창 */}
                    <input
                        type="text"
                        placeholder="검색어를 입력하세요"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)} // 검색어 입력 시 상태 변경
                        style={{ padding: "5px", width: "200px", marginRight: "10px" }}
                    />
                </div>

                {/* 게시글 추가 버튼 (오른쪽 정렬) */}
                <button
                    onClick={() => navigate("/addboard")}
                    style={{
                        padding: "5px 10px",
                        backgroundColor: "#4CAF50",
                        color: "white",
                        border: "none",
                        borderRadius: "3px",
                        cursor: "pointer",
                    }}
                >
                    게시글 추가
                </button>
            </div>

            {/* 게시판 테이블 */}
            {filteredBoards.length === 0 ? (
                <div>검색 결과가 없습니다.</div>
            ) : (
                <table
                    style={{
                        width: "100%",
                        borderCollapse: "collapse",
                        marginTop: "20px",
                    }}
                >
                    <thead>
                        <tr>
                            <th style={tableHeaderStyle}>번호</th>
                            <th style={tableHeaderStyle}>제목</th>
                            <th style={tableHeaderStyle}>작성자</th>
                            <th style={tableHeaderStyle}>추천 수</th>
                            <th style={tableHeaderStyle}>작성일</th>
                            <th style={tableHeaderStyle}>자세히보기</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredBoards.map((board, index) => (
                            <tr key={board.boardIdx} style={{ textAlign: "center" }}>
                                <td style={tableCellStyle}>{index + 1}</td>
                                <td style={tableCellStyle}>{board.title}</td>
                                <td style={tableCellStyle}>{board.memberId}</td>
                                <td style={tableCellStyle}>{board.boardGood}</td>
                                <td style={tableCellStyle}>
                                    {new Date(board.createdAt).toLocaleString()}
                                </td>
                                <td style={tableCellStyle}>
                                    <button
                                        onClick={() =>
                                            navigate(`/boarddetail/${board.boardIdx}`, {
                                                state: { memberId: board.memberId }, 
                                            })
                                        }
                                        style={{
                                            padding: "5px",
                                            backgroundColor: "#007BFF",
                                            color: "white",
                                            border: "none",
                                            borderRadius: "3px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        들어가기
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}

// 스타일 정의
const tableHeaderStyle = {
    padding: "10px",
    backgroundColor: "#f4f4f4",
    borderBottom: "2px solid #ddd",
    textAlign: "center",
};

const tableCellStyle = {
    padding: "10px",
    borderBottom: "1px solid #ddd",
};
