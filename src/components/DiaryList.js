import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import MyButton from './MyButton';
import DiaryItem from './DiaryItem';

const sortOptionList = [
    {value: "latest", name: "최신순"},
    {value: "oldest", name: "오래된 순"}
];

const filterOptionList = [
    {value: "all", name: "전부다"},
    {value: "good", name: "좋은 감정만"},
    {value: "bad", name: "안 좋은 감정만"}
];

const ControlMenu = React.memo(({value, hanldeTypeName, optionList}) => {
    return (
        <select className="ControlMenu" value={value} onChange={(e) => hanldeTypeName(e.target.value)}>
            {optionList.map((elem, idx) => <option key={idx} value={elem.value}>{elem.name}</option>)}
        </select>
    )
});

const DiaryList = ({diaryList}) => {
    const navigate = useNavigate();
    const [sortType, setSortType] = useState("latest");
    const [filter, setFilter] = useState("all");

    const getProcessdDiaryList = () => {
        const filterCallBack = (elem) => {
            if(filter === "good"){
                return parseInt(elem.emotion) <= 3;
            }else {
                return parseInt(elem.emotion) > 3;
            }
        }

        const compare = (a, b) => {
            if(sortType === 'latest'){
                return parseInt(b.date) - parseInt(a.date);
            }else{
                return parseInt(a.date) - parseInt(b.date);
            }
        };

        const copyList = JSON.parse(JSON.stringify(diaryList)); //배열째 비교하게 되면 얕은비교가 되기때문에 JSON화 시킨다
        const filterdList = filter === "all" ? copyList : copyList.filter((elem) => filterCallBack(elem));

        const sortedList = filterdList.sort(compare);
        //sort((a, b) => a - b) 오름차순 // b - a는 내림차순
        return sortedList;
    }

    return(
        <div className='DiaryList'>
            <div className="menu_wrapper">
                <div className="left_col">
                    <ControlMenu
                        value={sortType}
                        hanldeTypeName={setSortType}
                        optionList={sortOptionList}
                    >
                    </ControlMenu>
                    <ControlMenu
                        value={filter}
                        hanldeTypeName={setFilter}
                        optionList={filterOptionList}
                    >
                    </ControlMenu>
                </div>
                <div className="right_col">
                    <MyButton
                        type={'positive'}
                        text={'새 일기쓰기'}
                        onClick={() => navigate("/new")}
                    >
                    </MyButton>
                </div>
            </div>
            {getProcessdDiaryList().map(elem => <DiaryItem key={elem.id} {...elem}></DiaryItem>)}
        </div>
    )
};

DiaryList.defaultProps = {
    diaryList: [],
};

export default DiaryList;