import "./index.css";

// Header for the Answer page
const CommentHeader = ({ commentcnt, title, handleNewQuestion }) => {
    return (
        <div id="answersHeader" className="space_between right_padding">
            <div className="bold_title">{commentcnt} Comments</div>
            <div className="bold_title answer_question_title">{title}</div>
            <button
                className="bluebtn"
                onClick={() => {
                    handleNewQuestion();
                }}
            >
                Ask a Question
            </button>
        </div>
    );
};

export default CommentHeader;
