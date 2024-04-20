const Tag = require("../models/tags");
const Question = require("../models/questions");
// const Answer = require("../models/answers");

const addTag = async (tname) => {
    console.log(tname)
    const existingTag = await Tag.findOne({ name: tname });
    console.log(existingTag)
    if (existingTag) {
        return existingTag._id; 
    }

    const newTag = new Tag({ name: tname });
    console.log(newTag)
    const tag1 = await newTag.save();

    return tag1 ._id; 
};


const getQuestionsByOrder = async (order) => {
    try {
        const questions = await Question.find({}).populate('answers').populate('tags').populate('comments');
        if (order === 'active') {
            // Sorting by the latest answer and then by ask_date_time
            return questions.sort((a, b) => {
                const latestAnswerA = a.answers.length > 0 ? Math.max(...a.answers.map(ans => ans.ans_date_time)) : 0;
                const latestAnswerB = b.answers.length > 0 ? Math.max(...b.answers.map(ans => ans.ans_date_time)) : 0;
                return latestAnswerB - latestAnswerA || b.ask_date_time - a.ask_date_time;
            });
        } else if (order === 'newest') {
            // Sorting by ask_date_time (descending)
            return questions.sort((a, b) => b.ask_date_time - a.ask_date_time);
        } else if (order === 'unanswered') {
            // Filtering out questions with answers and sorting by ask_date_time (descending)
            return questions.filter(question => question.answers.length === 0)
                .sort((a, b) => b.ask_date_time - a.ask_date_time);
        } else if (order === 'views') {
            // Sorting by number of views (descending)
            return questions.sort((a, b) => b.views - a.views);
        } else if (order === 'discussed') {
            // Sorting by number of comments (descending)
            return questions.sort((a, b) => b.comments.length - a.comments.length);
        } else {
            return questions;
        }
    } catch (err) {
        console.error(err);
    }
}


const filterQuestionsBySearch = (qlist, search) => {
    try {
        if (!search) return qlist; 
        const searchTerms = search.split(" ").filter(term => term.trim() !== ''); 
        const filteredList = qlist.filter(question => {
            return searchTerms.some(term => {
                const regex = new RegExp(term.replace(/[[\]]/g, ''), 'i'); 
                if (term.startsWith('[') && term.endsWith(']')) {
                    return question.tags.some(tag => regex.test(tag.name)); 
                } else {
                    return regex.test(question.title) || regex.test(question.text);
                }
            });
        });
        return filteredList;
    } catch (err) {
        console.error(err);
        return [];
    }
};




module.exports = { addTag, getQuestionsByOrder, filterQuestionsBySearch };