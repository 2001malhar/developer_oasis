import { useState } from "react";
import Form from "../baseComponents/form";
import Input from "../baseComponents/input";
import Textarea from "../baseComponents/textarea";
import { validateHyperlink } from "../../../tool";
import { addCommentOnAnswer } from "../../../services/commentService";

const NewCommentAns = ({ aid, handleCommentsAnswer }) => {
    const [usrn, setUsrn] = useState("");
    const [text, setText] = useState("");
    const [usrnErr, setUsrnErr] = useState("");
    const [textErr, setTextErr] = useState("");
    const postComment = async () => {
        let isValid = true;

        if (!usrn) {
            setUsrnErr("Username cannot be empty");
            isValid = false;
        }

        if (!text) {
            setTextErr("Comment cannot be empty");
            isValid = false;
        }
        
        if (!validateHyperlink(text)) {
            setTextErr("Invalid hyperlink format.");
            isValid = false;
        }

        if (!isValid) {
            return;
        }

            const comment = {
                text: text,
                comment_by: usrn,
                commented_on: new Date(),
            };

            const res = await addCommentOnAnswer(aid, comment);
            if (res && res._id) {
                handleCommentsAnswer(aid);
            }
    };
    return (
        <Form>
            <Input
                title={"Username"}
                id={"commentUsernameInput"}
                val={usrn}
                setState={setUsrn}
                err={usrnErr}
            />
            <Textarea
                title={"Comment Text"}
                id={"commentTextInput"}
                val={text}
                setState={setText}
                err={textErr}
            />
            <div className="btn_indicator_container">
                <button
                    className="form_postBtn"
                    onClick={() => {
                        postComment();
                    }}
                >
                    Post Comment
                </button>
                <div className="mandatory_indicator">
                    * indicates mandatory fields
                </div>
            </div>
        </Form>
    );
};

export default NewCommentAns;
