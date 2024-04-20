import { useEffect, useState } from "react";
import { getMetaData } from "../../../tool";
import Comment from "../comments/comment/index";
import CommentHeader from "../comments/header/index";
import CommentBody from "../commentAnswer/commentAnswerBody";
import { getAnswerById } from "../../../services/answerService";

const AnswerCommentPage = ({ aid , handleNewQuestion, handleNewAnsComments }) => {
    const [answer, setAnswer] = useState({});
  
    useEffect(() => {
        const fetchData = async () => {
            console.log(aid)
            let res = await getAnswerById(aid);
            console.log(res);
            setAnswer(res || {});
        };
        fetchData().catch((e) => console.log(e));
    }, [aid]);

    return (
        <>
            <CommentHeader
                commentcnt={
                    answer && answer.comments && answer.comments.length
                }
                handleNewQuestion={handleNewQuestion}
            />
            <CommentBody
                text={answer && answer.text}
                askby={answer && answer.ans_by}
                meta={answer && getMetaData(new Date(answer.ans_date_time))}
            />
            {answer &&
                answer.comments &&
                answer.comments.map((a, idx) => (
                    console.log(a),
                    <Comment
                        key={idx}
                        text={a.text}
                        comment_by={a.comment_by}
                        meta={answer && getMetaData(new Date(a.commented_on))}
                    />
                ))}
            <button className="bluebtn ansButton" onClick={handleNewAnsComments}> Add a Comment </button>
        </>
    );
};

export default AnswerCommentPage;