import { REACT_APP_API_URL, api } from "./config";
import Cookies from "js-cookie";

const TAG_API_URL = `${REACT_APP_API_URL}/tag`;

const getTagsWithQuestionNumber = async () => {
    const token = Cookies.get("token");
    const res = await api.get(`${TAG_API_URL}/getTagsWithQuestionNumber`,{
        headers:{
            "Authorization": `Bearer ${token}`, 
        }
    });

    return res.data;
};

export { getTagsWithQuestionNumber };
