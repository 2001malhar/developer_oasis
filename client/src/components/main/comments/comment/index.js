import { handleHyperlink } from "../../../../tool";
// import "./index.css";

// Component for the Answer Page
const Comment = ({ text, comment_by,meta}) => {
    return (
        <div className="answer right_padding">
            <div id="answerText" className="answerText">
                {handleHyperlink(text)}
            </div>
            <div className="answerAuthor">
                <div className="answer_author">{comment_by}</div>
                <div className="answer_question_meta">{meta}</div>
            </div>
        </div>
    );
};

export default Comment;