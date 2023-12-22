const MyButton = ({text, type, onClick}) => {
    return(
        <button className={["MyButton", `MyButton_${type}`].join(" ")} onClick={onClick}>{text}</button>
    )
}

export default MyButton;