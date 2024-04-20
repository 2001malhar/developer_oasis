// Run this script to test your schema
// Start the mongoDB service as a background process before running the script
// Pass URL of your mongoDB instance as first argument(e.g., mongodb://127.0.0.1:27017/fake_so)
let userArgs = process.argv.slice(2);

if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}

let Tag = require('./models/tags')
let Answer = require('./models/answers')
let Question = require('./models/questions')
let Comment = require('./models/comments');
let User = require('./models/users')


let mongoose = require('mongoose');
let mongoDB = userArgs[0];
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
// mongoose.Promise = global.Promise;
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


function tagCreate(name) {
  let tag = new Tag({ name: name });
  return tag.save();
}

function answerCreate(text, ans_by, ans_date_time, comments = []) {
  let answerdetail = { text: text };
  if (ans_by != false) answerdetail.ans_by = ans_by;
  if (ans_date_time != false) answerdetail.ans_date_time = ans_date_time;
  if (comments.length > 0) answerdetail.comments = comments;

  let answer = new Answer(answerdetail);
  return answer.save();
}

function questionCreate(title, text, tags, answers = [], asked_by, ask_date_time, views, comments = []) {
  const qstndetail = {
    title: title,
    text: text,
    tags: tags,
    asked_by: asked_by
  };
  if (answers.length > 0) qstndetail.answers = answers;
  if (ask_date_time != false) qstndetail.ask_date_time = ask_date_time;
  if (views != false) qstndetail.views = views;
  if (comments.length > 0) qstndetail.comments = comments;

  let qstn = new Question(qstndetail);
  return qstn.save();
}

function commentCreate(text, comment_by,commented_on, question = null, answer = null) {
  let commentDetail = {
    text: text,
    comment_by: comment_by,
    commented_on:commented_on
  };

  if (question) {
    commentDetail.question = question;
  }

  if (answer) {
    commentDetail.answer = answer;
  }

  let comment = new Comment(commentDetail);
  return comment.save();
}

function userCreate(username, email, password) {
  let user = new User({ username, email, password });
  return user.save();
}


const populate = async () => {
  
  let u1 = await userCreate('user1', 'user1@example.com', '$2b$10$76V5nbJaSQsUnBxOEmFBhOX6lE6ZFYdZc13DhgN4kJErAoZimP0BW');
  let u2 = await userCreate('user2', 'user2@example.com', '$2b$10$76V5nbJaSQsUnBxOEmFBhOX6lE6ZFYdZc13DhgN4kJErAoZimP0BW');

  let t1 = await tagCreate('react');
  let t2 = await tagCreate('javascript');
  let t3 = await tagCreate('android-studio');
  let t4 = await tagCreate('shared-preferences');
  let t5 = await tagCreate('storage');
  let t6 = await tagCreate('website');
  let t7 = await tagCreate('Flutter');

  let c1 = await commentCreate('Great answer!', 'Alice',new Date('2023-11-20T03:24:42'));
  let c2 = await commentCreate('I agree, this is helpful.', 'Bob',new Date('2023-11-20T03:24:42'));
  let c3 = await commentCreate('Thanks for the explanation!', 'Charlie', new Date('2023-11-23T08:24:00'));
  let c4 = await commentCreate('I have a follow-up question.', 'David',new Date('2023-02-19T18:20:59'));
  let c5 = await commentCreate('This is a useful resource.', 'Emily',new Date('2023-02-22T17:19:00'));
  let c6 = await commentCreate('Can you provide more details?', 'Frank',new Date('2023-03-22T21:17:53'));
  let c7 = await commentCreate("I'm facing a similar issue.", 'George',new Date('2023-02-18T01:02:15'));

  let a1 = await answerCreate('React Router is mostly a wrapper around the history library. history handles interaction with the browser\'s window.history for you with its browser and hash histories. It also provides a memory history which is useful for environments that don\'t have a global history. This is particularly useful in mobile app development (react-native) and unit testing with Node.', 'hamkalo', new Date('2023-11-20T03:24:42'), [c1]);
  let a2 = await answerCreate('On my end, I like to have a single history object that I can carry even outside components. I like to have a single history.js file that I import on demand, and just manipulate it. You just have to change BrowserRouter to Router, and specify the history prop. This doesn\'t change anything for you, except that you have your own history object that you can manipulate as you want. You need to install history, the library used by react-router.', 'azad', new Date('2023-11-23T08:24:00'), [c2]);
  let a3 = await answerCreate('Consider using apply() instead; commit writes its data to persistent storage immediately, whereas apply will handle it in the background.', 'abaya', new Date('2023-11-18T09:24:00'));
  let a4 = await answerCreate('YourPreference yourPrefrence = YourPreference.getInstance(context); yourPreference.saveData(YOUR_KEY,YOUR_VALUE);', 'alia', new Date('2023-11-12T03:30:00'));
  let a5 = await answerCreate('I just found all the above examples just too confusing, so I wrote my own. ', 'sana', new Date('2023-11-01T15:24:19'));
  let a6 = await answerCreate('Storing content as BLOBs in databases.', 'abhi3241', new Date('2023-02-19T18:20:59'));
  let a7 = await answerCreate('Using GridFS to chunk and store content.', 'mackson3332', new Date('2023-02-22T17:19:00'));
  let a8 = await answerCreate('Store data in a SQLLite database.', 'ihba001', new Date('2023-03-22T21:17:53'), [c4]);

  let q1 = await questionCreate('Programmatically navigate using React router', 'the alert shows the proper index for the li clicked, and when I alert the variable within the last function Im calling, moveToNextImage(stepClicked), the same value shows but the animation isnt happening. This works many other ways, but Im trying to pass the index value of the list item clicked to use for the math to calculate.', [t1, t2], [a1, a2], 'Joji John', new Date('2022-01-20T03:00:00'), 10, [c3]);
  let q2 = await questionCreate('android studio save string shared preference, start activity and load the saved string', 'I am using bottom navigation view but am using custom navigation, so my fragments are not recreated every time i switch to a different view. I just hide/show my fragments depending on the icon selected. The problem i am facing is that whenever a config change happens (dark/light theme), my app crashes. I have 2 fragments in this activity and the below code is what i am using to refrain them from being recreated.', [t3, t4, t2], [a3, a4, a5], 'saltyPeter', new Date('2023-01-10T11:24:30'), 121, [c5]);
  let q3 = await questionCreate('Object storage for a web application', 'I am currently working on a website where, roughly 40 million documents and images should be served to its users. I need suggestions on which method is the most suitable for storing content with subject to these requirements.', [t5, t6], [a6, a7], 'monkeyABC', new Date('2023-02-18T01:02:15'), 200, [c6]);
  let q4 = await questionCreate('Quick question about storage on android', 'I would like to know the best way to go about storing an array on an android phone so that even when the app/activity ended the data remains', [t3, t4, t5], [a8], 'elephantCDE', new Date('2023-03-10T14:28:01'), 103, [c7]);

  if (db) db.close();
  console.log('done');
  console.log(t7);
};


populate()
  .catch((err) => {
    console.log('ERROR: ' + err);
    if(db) db.close();
  });

console.log('processing ...');





