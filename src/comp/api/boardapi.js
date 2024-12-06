import api from '../ax/axiosSetting';

/**
 * 게시글 목록 가져오기
 * @param {Object} params - 검색 키워드, 정렬 기준 등의 검색 조건
 * @returns {Promise}
 */
export const fetchBoards = (params) => {
    return api.get('/board/list', { params });
};

/**
 * 게시글 추천
 * @param {number} boardId - 추천할 게시글 ID
 * @returns {Promise}
 */
export const recommendBoard = (boardId) => {
    return api.post('/board/good', { boardId });
};

/**
 * 게시글 삭제
 * @param {number} boardId - 삭제할 게시글 ID
 * @returns {Promise}
 */
export const deleteBoard = (boardId) => {
    return api.post('/board/remove', { boardId });
};

/**
 * 게시글 수정
 * @param {Object} data
 * @param {number} data.boardId - 수정할 게시글 ID
 * @param {string} data.title - 수정된 제목
 * @param {string} data.content - 수정된 내용
 * @param {string} data.memberId - 수정하는 사용자 ID
 * @returns {Promise}
 */
export const modifyBoard = (data) => {
    return api.post('/board/modify', data);
};

/**
 * 게시글 상세 조회
 * @param {number} boardId - 조회할 게시글 ID
 * @returns {Promise}
 */
export const fetchBoardDetail = (boardId) => {
    return api.get('/board/find', { params: { boardId } });
};

/**
 * 게시글 추가
 * @param {Object} data
 * @param {string} data.title - 게시글 제목
 * @param {string} data.content - 게시글 내용
 * @param {string} data.memberId - 게시글 작성자 ID
 * @returns {Promise}
 */
export const createBoard = (data) => {
    return api.post('/board/regist', data);
};
