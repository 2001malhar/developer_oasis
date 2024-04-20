import { handleHyperlink } from "../../../../tool";
import "./index.css";

const Answer = ({ text,aid, ansBy, meta,handleCommentsAnswer}) => {
    return (
        <div className="answer right_padding">
            <div id="answerText" className="answerText">
                {handleHyperlink(text)}
            </div>
            <div className="answerAuthor">
                <div className="answer_author">{ansBy}</div>
                <div className="answer_question_meta">{meta}</div>
            </div>
            <button className="button_comment" onClick={() => handleCommentsAnswer(aid)}>Comment</button>
        </div>
        
    );
};

export default Answer;
