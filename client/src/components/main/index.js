import "./index.css";
import { useState } from "react";
import SideBarNav from "./sideBarNav";
import QuestionPage from "./questionPage";
import TagPage from "./tagPage";
import AnswerPage from "./answerPage";
import NewQuestion from "./newQuestion";
import NewAnswer from "./newAnswer";
import CommentPage from "./comments";
import NewComment from "./addComment";
import AnswerCommentPage from "./commentAnswer";
import NewCommentAns from "./addCommentAnswer";

const Main = ({ search = "", title, setQuesitonPage }) => {
    const [page, setPage] = useState("home");
    const [questionOrder, setQuestionOrder] = useState("newest");
    const [qid, setQid] = useState("");
    const [aid, setAid] = useState("");
    let selected = "";
    let content = null;

    const handleQuestions = () => {
        setQuesitonPage();
        setPage("home");
    };

    const handleTags = () => {
        setPage("tag");
    };

    const handleAnswer = (qid) => {
        setQid(qid);
        setPage("answer");
    };

    const clickTag = (tname) => {
        setQuesitonPage("[" + tname + "]", tname);
        setPage("home");
    };

    const handleNewQuestion = () => {
        setPage("newQuestion");
    };

    const handleNewAnswer = () => {
        setPage("newAnswer");
    };

    const handleComments = (qid) => {
        setQid(qid);
        setPage("comments");
    };

    const handleCommentsAnswer = (aid) => {
        console.log(aid)
        setAid(aid);
        setPage("commentAnswer")
    }
    

    const handleNewComments = () => {
        setPage("newComment");
    }

    const handleNewAnsComments = () => {
        setPage("newAnsComment");
    }

    const getQuestionPage = (order = "newest", search = "") => {
        return (
            <QuestionPage
                title_text={title}
                order={order}
                search={search}
                setQuestionOrder={setQuestionOrder}
                clickTag={clickTag}
                handleAnswer={handleAnswer}
                handleNewQuestion={handleNewQuestion}
                handleComments = {handleComments}
            />
        );
    };

    switch (page) {
        case "home": {
            selected = "q";
            content = getQuestionPage(questionOrder.toLowerCase(), search);
            break;
        }
        case "tag": {
            selected = "t";
            content = (
                <TagPage
                    clickTag={clickTag}
                    handleNewQuestion={handleNewQuestion}
                />
            );
            break;
        }
        case "answer": {
            selected = "";
            content = (
                <AnswerPage
                    qid={qid}
                    handleNewQuestion={handleNewQuestion}
                    handleNewAnswer={handleNewAnswer}
                    handleCommentsAnswer = {handleCommentsAnswer}
                />
            );
            break;
        }
        case "newQuestion": {
            selected = "";
            content = <NewQuestion handleQuestions={handleQuestions} />;
            break;
        }
        case "newAnswer": {
            selected = "";
            content = <NewAnswer qid={qid} handleAnswer={handleAnswer} />;
            break;
        }
        case "newComment" : {
            selected = "";
            content = <NewComment qid={qid} handleComments= {handleComments}/>;
            break;
        }
        case "newAnsComment" : {
            selected = "";
            content = <NewCommentAns aid={aid} handleCommentsAnswer= {handleCommentsAnswer}/>;
            break;
        }
        case "comments" : {
            selected = "";
            content = <CommentPage 
                        qid = {qid} 
                        handleNewQuestion={handleNewQuestion}
                        handleNewComments = {handleNewComments}   
                    />;
            break;
        }
        case "commentAnswer" : {
            selected = "";
            content = <AnswerCommentPage 
                        aid = {aid}
                        handleNewQuestion={handleNewQuestion}
                        handleNewAnsComments = {handleNewAnsComments}   
                    />;
            break;
        }
        default:
            selected = "q";
            content = getQuestionPage();
            break;
    }

    return (
        <div id="main" className="main">
            <SideBarNav
                selected={selected}
                handleQuestions={handleQuestions}
                handleTags={handleTags}
            />
            <div id="right_main" className="right_main">
                {content}
            </div>
        </div>
    );
};

export default Main;
