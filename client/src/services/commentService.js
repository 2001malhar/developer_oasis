import { REACT_APP_API_URL, api } from "./config";
import Cookies from "js-cookie";

const COMMENT_API_URL = `${REACT_APP_API_URL}/comments`;

// To add answer
const addComment = async (qid, comment) => {
    const token = Cookies.get("token");
    const data = { qid: qid, comment: comment };
    const res = await api.post(`${COMMENT_API_URL}/addComment`, data,{
        headers:{
            "Authorization": `Bearer ${token}`,
        }
    });

    return res.data;
};


const addCommentOnAnswer = async (aid, comment) => {
    const token = Cookies.get("token");
    const data = { aid: aid, comment: comment };
    console.log(data)
    const res = await api.post(`${COMMENT_API_URL}/addCommentOnAnswer`, data,{
        headers:{
            "Authorization": `Bearer ${token}`,
        }
    });

    return res.data;
};
export { addComment, addCommentOnAnswer };