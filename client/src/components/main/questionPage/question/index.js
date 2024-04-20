import { getMetaData } from "../../../../tool";
import "./index.css";

// const Question = ({ q, clickTag, handleAnswer, handleComments }) => {
//   return (
//     <div className="question right_padding">
//       <div className="action-buttons">
//         <button>+</button>
//         <button>-</button>
//       </div>
//       <div className="postStats">
//         <div> {q.vote} Votes </div>
//         <div>{q.answers.length || 0} answers</div>
//         <div>{q.views} views</div>
//       </div>
//       <div className="question_mid">
//         <div className="postTitle">{q.title}</div>
//         <div className="question_tags">
//           {q.tags.map((tag, idx) => {
//             return (
//               <button
//                 key={idx}
//                 className="question_tag_button"
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   clickTag(tag.name);
//                 }}
//               >
//                 {tag.name}
//               </button>
//             );
//           })}
//         </div>
//       </div>
//       <div className="lastActivity">
//         <div className="question_author">{q.asked_by}</div>
//         <div>&nbsp;</div>
//         <div className="question_meta">
//           asked {getMetaData(new Date(q.ask_date_time))}
//         </div>
//       </div>
//       <div className="action-buttons">
//         <button className="button_comment" onClick={() => handleComments(q._id)}>Comment</button>
//         <button className="button_comment" onClick={() => handleAnswer(q._id)}>Answer</button>
//       </div>
//     </div>
//   );
// };

const Question = ({ q, clickTag, handleAnswer, handleComments }) => {
  return (
    <div className="question right_padding" data-testid="question">
      <div className="postStats">
        <div data-testid="answer-count">{q.answers.length || 0} answers</div>
        <div data-testid="view-count">{q.views} views</div>
      </div>
      <div className="question_mid">
        <div className="postTitle" data-testid="question-title">
          {q.title}
        </div>
        <div className="question_tags">
          {q.tags.map((tag, idx) => {
            return (
              <button
                key={idx}
                className="question_tag_button"
                onClick={(e) => {
                  e.stopPropagation();
                  clickTag(tag.name);
                }}
                data-testid={`tag-button-${tag.name}`}
              >
                {tag.name}
              </button>
            );
          })}
        </div>
      </div>
      <div className="lastActivity">
        <div className="question_author" data-testid="question-author">
          {q.asked_by}
        </div>
        <div>&nbsp;</div>
        <div className="question_meta" data-testid="question-meta">
          asked {getMetaData(new Date(q.ask_date_time))}
        </div>
      </div>
      <div className="action-buttons">
        <button
          className="button_comment"
          onClick={() => handleComments(q._id)}
          data-testid="comment-button"
        >
          Comment
        </button>
        <button
          className="button_comment"
          onClick={() => handleAnswer(q._id)}
          data-testid="answer-button"
        >
          Answer
        </button>
      </div>
    </div>
  );
};

export default Question;