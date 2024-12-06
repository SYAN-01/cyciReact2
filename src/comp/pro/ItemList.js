import { useEffect, useState } from 'react';
import { itemList, itemGood } from '../api/item';
import ItemArea from './ItemArea'

export default function Study() {

    const [items, setItems] = useState([]);
    const [categoryId, setCategoryId] = useState(0);
    const [keyword, setKeyword] = useState('');

    const catagoryLists = [
        { id: '0', 'name': '전체' },
        { id: '1', 'name': '도서' },
        { id: '2', 'name': '전자' },
        { id: '3', 'name': '생활' }
    ]

    //JavaScript의 오버로딩
    //Java는 오버로딩이 필요한 갯수만큼 method를 만들면.
    //JavaScript는 필요 없으면 생략.
    function startItemList(seachItem) {
        itemList(seachItem)
            .then(res => {
                console.log(res);
                if (res.data.code == 200) {
                    setItems(res.data.data);
                    console.log(res.data.data);
                }
            })
    }

    useEffect(() => {
        startItemList();
    }, [])

    useEffect(() => {
        seachBtn();
    }, [keyword, categoryId]);

    function categoryNum(num) {
        setCategoryId(num);
    }

    /** 검색 버튼 */
    function seachBtn() {
        let param = new Object();
        param.categoryIdx = categoryId;
        param.keyword = keyword;
        console.log(param);

        startItemList(param); // 아이템 검색
    }

    //값 추천 올리기
    function changeItem(idx) {
        let obj = new Object();
        obj.itemIdx = idx;

        itemGood(obj);

        const copyItems = [...items];
        copyItems[idx - 1] = { ...copyItems[idx - 1], good: copyItems[idx - 1].good + 1 };
        setItems(copyItems);

    }

    return (
        <div>
            <h1>아이템 리스트</h1>
            {/** 카테고리 리스트 */}
            {catagoryLists.map(
                (item, index) => (
                    <div key={index}>
                        <a onClick={
                            e => {
                                e.preventDefault();     //html 기본기능 멈추게 하기
                                categoryNum(item.id);
                            }
                        }>{item.name}</a>
                    </div>
                )
            )}
            <input
                type="text"
                placeholder='검색'
                value={keyword}
                onChange={
                    e => setKeyword(e.target.value)
                } />
            <input type="button" value="검색" onClick={seachBtn} />
            {/** 아이템 리스트 */}
            {items.map(
                (item, index) => (
                    <ItemArea key={index} item={item} index={index} onGoodUp={
                        (idx) => {
                            const copy = items.copy;
                            changeItem(idx);
                        }
                    }></ItemArea>
                )
            )}
        </div>
    )
}