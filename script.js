let questions = [{ // Questions for h2 tag. An array that that has objects such as `questions` `answers`
    question: "Who is stronger than Goku?",
    answers: [
        { text: "Naruto", correct: false}, // Answers held in a key value pair. text: "some text" and correct: boolean value of T or F 
        { text: "Vegeta", correct: false},
        { text: "Luffy", correct: false},
        { text: "Nobody is stronger than Goku.", correct: true}
    ]
},
{
    question: "Which anime studio adapated Fate/Stay Night: Unlimited Blade Works?",
    answers: [
        { text: "ufotable", correct: true},
        { text: "Kyoto Animation", correct: false},
        { text: "Gainax", correct: false},
        { text: "Madhouse", correct: false}
    ]
},
{
    question: "What manga series tells a tale of a young boy becoming a world class boxer?",
    answers: [
        { text: "Baki the Grappler", correct: false},
        { text: "Ashita no Joe", correct: false},
        { text: "Hajime no Ippo", correct: true},
        { text: "SLAMDUNK", correct: false}
    ]
},
{
    question: `Which three series are considered the "Big three" of shonen anime?`,
    answers: [
        { text: "One Piece, Naruto and Bleach", correct: true} ,
        { text: "My Hero Academia, Attack on Titan and Jujitsu Kaisen", correct: true},
        { text: "Dragon Ball, Yu Yu Hakusho and Fist of the Northstar", correct: false},
        { text: "Hunter x Hunter, Baki the grappler and Gintama", correct: false}
    ]
},
{
    question: "What is the most popular Manga that is running right now?",
    answers: [
        { text: "Jujitsu Kaisen", correct: false},
        { text: "Blue Lock", correct: false},
        { text: "Kagurabachi", correct: false},
        { text: "One Piece", correct: true}
    ]
},
{
    question: "In the Mobile Suit Gundam anime series, what is the most recognized gundam?",
    answers: [
        { text: "RX-0", correct: false},
        { text: "Zaku II", correct: false},
        { text: "RX-78-2", correct: true},
        { text: "ASW-G-08", correct: false}
    ]
},
{
    question: "Who is the author of Dragon Ball?",
    answers: [
        { text: "Kentaro Miura", correct: false},
        { text: "Masashi Kishimoto", correct: false},
        { text: "Eiichiro Oda", correct: false},
        { text: "Akira Toriyama", correct: true}
    ]
},
{
    question: "Which author of shonen mangas is married to the author of Sailor Moon(Naoko Takeuchi)?",
    answers: [
        { text: "Berserk - Kentaro Miura", correct: false},
        { text: "Death Note - Tsugumi Ohba", correct: false},
        { text: "Hunter x  Hunter - Yoshihiro Togashi", correct: true},
        { text: "Dragon Ball - Akira Toriyama", correct: false}
    ]
},
{
    question: "Which anime series from 1997 features a world where humans coexist with creatures?",
    answers: [
        { text: "Pokemon", correct: true},
        { text: "Digimon", correct: false},
        { text: "Parasyte", correct: false},
        { text: "Beelzebub ", correct: false}
    ]
},
{
    question: "Who teaches Naruto Rasengan?",
    answers: [
        { text: "Kakashi", correct: false},
        { text: "Jiraiya", correct: true},
        { text: "Oibto", correct: false},
        { text: "Tsunade ", correct: false}
    ]
}];

// Consts to refer to in code below
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const restartButton = document.getElementById("restart-btn");

let currQuestionIndex = 0; // Keeps track of index of questions
let score = 0; // Score for score
const userAnswers = []; // Store the user answers to show what they get wrong

const makerButton = document.getElementById("");
let selectedAnswerButton = null; // Keeps track of current answer

function startQuiz(){ // Intialize the index and score to 0 for use
    getSavedQuestions(); // Get Custom Quiz if any
    currQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestions();

    // Event listener for quiz
    nextButton.addEventListener("click", showNextQuestion);
    restartButton.addEventListener("click", restartQuiz);
}

function showQuestions(){ // Display questions on form
    resetQuiz(); // First reset the quiz
    let currentQuestion = questions[currQuestionIndex]; // Set the question index  to the current  question index
    let questionNum = currQuestionIndex +1; // Iterate by 1 to increase index and change the question
    questionElement.innerHTML = questionNum + ". " + currentQuestion.question; // Grab the text from the element and format it (1. Question, 2. Question..etc)

    currentQuestion.answers.forEach(answer => { // Iterate through array of answer
        const button = document.createElement("button"); // Create a button and set each button to the whatever text answer has 
        button.innerHTML = answer.text
        button.classList.add("btn"); // Add said created button to btn class
        answerButtons.appendChild(button); // Append it to the container to display
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", (selectAnswer));
    });
}

function showNextQuestion() { // Shows the next question and serves as the overall check if the quiz is done or not
    checkAnswer(); // Check currently selected answer
    currQuestionIndex++; // Move to the next question
    if (currQuestionIndex < questions.length) { // Compare the index to the length of questions display it, once out end the quiz since there is no more questions
        showQuestions(); 
    } 
    else {
        endQuiz();
    }
}

function resetQuiz(){ // Hides the answer buttons (answer 1,2,3..etc) and resets the quiz
    nextButton.style.display = "none";
    restartButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function restartQuiz() { // Restarts the quiz by setting index to 0 and score back to 0
    currQuestionIndex = 0;
    score = 0;
    startQuiz(); // Start the quiz
}

function endQuiz() { // Ends the quiz and show restart button to start over. Also show the score of the quiz
    resetQuiz();
    questionElement.innerHTML = `Quiz finished! You got ${score} out of ${questions.length} correct.`;
    restartButton.style.display = "block";
}

function selectAnswer(e) // Deselect all other buttons (in case different answer chosen) and select new answer
{
    Array.from(answerButtons.children).forEach(button => { // Iterate through the containers of answer choices and disable all of them once chosen
        button.classList.remove("selected");
    });
   
    const selectedBtn = e.target; // This case we are looking for a target which is selectedBtn
    selectedBtn.classList.add("selected");
   
    nextButton.style.display = "block"; // Display the next button
    userAnswers[currQuestionIndex] = selectedBtn.textContent; // Store user's selected answer
    selectedAnswerButton = selectedBtn // Store current selected button
}

function checkAnswer() 
{
    const isCorrect = selectedAnswerButton.dataset.correct === "true";
    if (isCorrect) {
        score++; // Increment score if the correct answer is chosen
    }
}

function transitionPage(pageName)
{
    window.location.href = pageName;
}

function getSavedQuestions()
{
    var savedQs = JSON.parse(localStorage.getItem("CustomQuiz"));
    if (savedQs != null) { questions = savedQs; }
}

startQuiz(); // Start the quiz