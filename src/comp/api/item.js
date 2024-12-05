import api from '../ax/axiosSetting'

/**
 * 아이템 리슷트
 * @param {} param 
 * @returns 
 */
export const itemList = (param) => {

    return api.get('/item/all', {
        params: param
    });
}

/**
 * 추천 아이템
 * @param {*} obj 
 * @returns 
 */
export const itemGood = (obj) => {
    return api.get('/item/good', {
        params: obj
    });
}


/**
 * 추천 아이템
 * @param {*} obj 
 * @returns 

export const itemGood = (obj) => {
    return api.post('/item/good', JSON.stringify(obj));
}
     */