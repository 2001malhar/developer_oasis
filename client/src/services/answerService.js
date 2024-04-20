import { REACT_APP_API_URL, api } from "./config";
import Cookies from "js-cookie";

const ANSWER_API_URL = `${REACT_APP_API_URL}/answer`;

// To add answer
const addAnswer = async (qid, ans) => {
    const token = Cookies.get("token");
    const data = { qid: qid, ans: ans };
    const res = await api.post(`${ANSWER_API_URL}/addAnswer`, data,{
        headers:{
            "Authorization": `Bearer ${token}`,
        }
    });

    return res.data;
};

const getAnswerById = async (aid) => {
    const token = Cookies.get("token");
    const res = await api.get(`${ANSWER_API_URL}/getAnswerById/${aid}`,{
        headers:{
            "Authorization": `Bearer ${token}`,
        }
    });

    return res.data;
};

export { addAnswer, getAnswerById };



