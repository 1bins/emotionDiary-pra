import { useNavigate, useSearchParams } from "react-router-dom";

const Edit = () => {

    const [searchParams, setSearchParams] = useSearchParams();

    const id = searchParams.get('id');
    const mode = searchParams.get('mode');

    console.log(`id: ${id} / mode: ${mode}`);

    
    //로그인이 안 되었을 경우 사용하는 hooks
    const navigate = useNavigate();

    return(
        <div>
            <h1>Edit</h1>
            <p>이곳은 일기 수정 페이지 입니다.</p>
            <button onClick={() => setSearchParams({who: "wonbinSeo"})}>QS 바꾸기</button>
            <button onClick={() => {navigate("/home")}}>HOME으로 가기</button>
            <button onClick={() => {navigate(-1)}}>뒤로가기</button>
        </div>
    );
};

export default Edit;