const questions = [{ // Questions for h2 tag
    question: "Who is stronger than Goku?",
    answers: [
        { text: "Naruto", correct: false},
        { text: "Vegeta", correct: false},
        { text: "Luffy", correct: false},
        { text: "Nobody is stronger than Goku.", correct: true}
    ]
},
{
    question: "What is a best CPSC class in CSUF?",
    answers: [
        { text: "CPSC 349 with Prof Kushwaha", correct: true},
        { text: "CPSC 471 with Prof Tian", correct: false},
        { text: "CPSC 240 with Prof McCarthy", correct: false},
        { text: "CPSC 335 with Prof Shilpa", correct: false}
    ]
},
{
    question: "When is the best time to find parking in CSUF?",
    answers: [
        { text: "9:00 PM", correct: false},
        { text: "2:00 PM", correct: false},
        { text: "11:00 AM", correct: true},
        { text: "7:00 AM", correct: false}
    ]
},
{
    question: "Where is Pieology located on campus?",
    answers: [
        { text: "On State College and Chapman", correct: false} ,
        { text: "The Titan Student Union", correct: true},
        { text: "In the Nutwood Structure", correct: false},
        { text: "ECS Fullerton, CA 92831", correct: false}
    ]
},
{
    question: "What is the best Manga that is running right now?",
    answers: [
        { text: "Jujitsu Kaisen", correct: false},
        { text: "Blue Lock", correct: false},
        { text: "Kagurabachi", correct: false},
        { text: "One Piece", correct: true}
    ]
}];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestions();
}

function showQuestions(){
    resetQuiz();
    let currentQuestion = questions[currQuestionIndex];
    let questionNum = currQuestionIndex +1;
    questionElement.innerHTML = questionNum + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text
        button.classList.add("btn");
        answerButtons.appendChild(button);
        
    });
}

function resetQuiz(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

startQuiz();