import { useEffect, useState } from "react";
import { getMetaData } from "../../../tool";
import Comment from "./comment";
import CommentHeader from "./header";
import QuestionBody from "./questionBody";
import { getQuestionByIdComment } from "../../../services/questionService";

// Component for the Answers page
const CommentPage = ({ qid , handleNewQuestion, handleNewComments }) => {
    const [question, setQuestion] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            console.log(qid)
            let res = await getQuestionByIdComment(qid);
            console.log(res);
            setQuestion(res || {});
        };
        fetchData().catch((e) => console.log(e));
    }, [qid]);

    return (
        <>
            <CommentHeader
                commentcnt={
                    question && question.comments && question.comments.length
                }
                title={question && question.title}
                handleNewQuestion={handleNewQuestion}
            />
            <QuestionBody
                views={question && question.views}
                text={question && question.text}
                askby={question && question.asked_by}
                meta={question && getMetaData(new Date(question.ask_date_time))}
            />
            {question &&
                question.comments &&
                question.comments.map((a, idx) => (
                    console.log(a),
                    <Comment
                        key={idx}
                        text={a.text}
                        comment_by={a.comment_by}
                        meta={getMetaData(new Date(a.commented_on))}
                    />
                ))}
            <button className="bluebtn ansButton" onClick={handleNewComments}> Add a Comment </button>
        </>
    );
};

export default CommentPage;

