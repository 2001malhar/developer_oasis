import { REACT_APP_API_URL, api } from "./config";
import Cookies from "js-cookie";

const QUESTION_API_URL = `${REACT_APP_API_URL}/question`;

const getQuestionsByFilter = async (order = "newest", search = "") => {
    const token = Cookies.get("token");

    const res = await api.get(
        `${QUESTION_API_URL}/getQuestion?order=${order}&search=${search}`, {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }
    );

    return res.data;
};

// To get Questions by id
const getQuestionById = async (qid) => {
    const token = Cookies.get("token");
    const res = await api.get(`${QUESTION_API_URL}/getQuestionById/${qid}`,{
        headers:{
            "Authorization": `Bearer ${token}`,
        }
    });

    return res.data;
};

// To add Questions
const addQuestion = async (q) => {
    const token = Cookies.get("token");
    const res = await api.post(`${QUESTION_API_URL}/addQuestion`, q,{
        headers:{
            "Authorization": `Bearer ${token}`,
        }
    });

    return res.data;
};

const getQuestionByIdComment = async (qid) => {
    const token = Cookies.get("token");
    const res = await api.get(
        `${QUESTION_API_URL}/getQuestionByIdComment/${qid}`,
        {
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        }
    );
    return res.data;
};


export { getQuestionsByFilter, getQuestionById, addQuestion, getQuestionByIdComment };
