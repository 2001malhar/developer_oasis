import { useEffect, useState } from "react";
import { getMetaData } from "../../../tool";
import Answer from "./answer";
import AnswerHeader from "./header";
import "./index.css";
import QuestionBody from "./questionBody";
import { getQuestionById } from "../../../services/questionService";
import { getAnswerById } from "../../../services/answerService";

// Component for the Answers page
const AnswerPage = ({ qid, handleNewQuestion, handleNewAnswer,handleCommentsAnswer }) => {
    const [question, setQuestion] = useState({});
    useEffect(() => {
        const fetchData = async () => {

            let res = await getQuestionById(qid);
            console.log(res);
            setQuestion(res || {});
        };
        fetchData().catch((e) => console.log(e));
    }, [qid]);

    return (
        <>
            <AnswerHeader
                ansCount={
                    question && question.answers && question.answers.length
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
                question.answers &&
                question.answers.map((a, idx) => (
                    console.log(a),
                    <Answer
                        key={idx}
                        aid = {a._id}
                        text={a.text}
                        ansBy={a.ans_by}
                        handleCommentsAnswer = {handleCommentsAnswer}
                        meta={getMetaData(new Date(a.ans_date_time))}
                        
                    />
                ))}
            <button
                className="bluebtn ansButton"
                onClick={() => {
                    handleNewAnswer();
                }}
            >
                Answer Question
            </button>
        </>
    );
};

export default AnswerPage;
