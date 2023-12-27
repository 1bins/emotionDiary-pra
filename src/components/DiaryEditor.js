import { useState, useRef, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryDispatchContext } from "../App"

import MyHeader from "./MyHeader";
import MyButton from "./MyButton";
import EmotionItem from "./EmotionItem";


const getStringDate = (date) => {
    return date.toISOString().slice(0, 10);
}

const emotionList = [
    {
        emotion_id: 1,
        emotion_img: process.env.PUBLIC_URL + `/images/emotion1.png`,
        emotion_descript: "완전 좋음"
    },
    {
        emotion_id: 2,
        emotion_img: process.env.PUBLIC_URL + `/images/emotion2.png`,
        emotion_descript: "좋음"
    },
    {
        emotion_id: 3,
        emotion_img: process.env.PUBLIC_URL + `/images/emotion3.png`,
        emotion_descript: "그럭저럭"
    },
    {
        emotion_id: 4,
        emotion_img: process.env.PUBLIC_URL + `/images/emotion4.png`,
        emotion_descript: "나쁨"
    },
    {
        emotion_id: 5,
        emotion_img: process.env.PUBLIC_URL + `/images/emotion5.png`,
        emotion_descript: "끔찍함"
    }
]

const DiaryEditor = ({isEdit, originData}) => {
    const navigate = useNavigate();
    const contentRef = useRef();

    const [date, setDate] = useState(getStringDate(new Date()));
    const [emotion, setEmotion] = useState(3);
    const [content, setContent] = useState("");

    const {onCreate, onEdit} = useContext(DiaryDispatchContext);
    const handleClickEmote = (emotion) => setEmotion(emotion);

    const handleSubmit = () => {
        if(content.length < 1){
            contentRef.current.focus();
            return;
        }

        if(window.confirm(isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?")){
            if(!isEdit){
                onCreate(date, content, emotion);
            }else{
                onEdit(originData.id, date, content, emotion);
            }
        }
        navigate("/", {replace: true})
    }

    useEffect(() => {
        if(isEdit){
            setDate(getStringDate(new Date(parseInt(originData.date))));
            setEmotion(originData.emotion);
            setContent(originData.content);
        }
    }, [isEdit, originData]);

    return(
        <div className="DiaryEditor">
            <MyHeader
                headText={isEdit ? "일기 수정하기" : "새로운 일기 쓰기"}
                leftChild={<MyButton text={"< 뒤로가기"} onClick={() => navigate(-1)}></MyButton>}
            >
            </MyHeader>
            <div>
                <section>
                    <h4>오늘은 언제인가요?</h4>
                    <div className="input_box">
                        <input 
                            className="input_date"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                </section>
                <section>
                    <h4>오늘의 감정</h4>
                    <div className="emotion_list_wrapper">
                        {emotionList.map((elem) => <EmotionItem key={elem.id} {...elem} onClickEmote={handleClickEmote} isSelected={elem.emotion_id === emotion}></EmotionItem>)}
                    </div>
                </section>
                <section>
                    <h4>오늘의 일기</h4>
                    <div className="input_box text_wrapper">
                        <textarea
                            ref={contentRef}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="오늘은 어땠나요?"
                        >
                        </textarea>
                    </div>
                </section>
                <section>
                    <div className="control_box">
                        <MyButton text={"취소하기"} onClick={() => navigate(-1)}></MyButton>
                        <MyButton text={"작성완료"} type={"positive"} onClick={handleSubmit}></MyButton>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default DiaryEditor;