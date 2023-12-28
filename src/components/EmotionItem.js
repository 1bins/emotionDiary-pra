import React from "react";

const EmotionItem = ({emotion_id, emotion_img, emotion_descript, onClickEmote, isSelected}) => {
    return(
        <div className={["EmotionItem", isSelected ? `EmotionItem_on EmotionItem_on_${emotion_id}` : "EmotionItem_off"].join(" ")} onClick={() => onClickEmote(emotion_id)}>
            <img src={emotion_img} />
            <span>{emotion_descript}</span>
        </div>
    );
}

export default React.memo(EmotionItem);