// Creation Functions
const qNameInput = document.getElementById("qzname");
const qNumInput = document.getElementById("numqs");
const qcontainer = document.getElementById("qcontainer");
const submitButton = document.getElementById("submit-btn");

let prevqnum = 0;

const questions = [{}];

function startCreation()
{
    localStorage.clear();
    generateQuestionFields();

    // Event listeners for creation
    qNumInput.addEventListener("input", generateQuestionFields);
    submitButton.addEventListener("click", finalizeQuizCreation);
}

function generateQuestionFields()
{
    let qnum = Math.min(qNumInput.value, 20);
    qNumInput.value = qnum;

    // delete old divs
    if (qnum < prevqnum) {
        for (var i = prevqnum; i > qnum; i--) {
            var qdiv = document.getElementById(`qdiv${i}`);
            qdiv.remove();
        }
    }
    
    // create new divs
    else {
        for (var i = prevqnum; i < qnum; i++) {
            createDynamicQDiv(i);
        }
    }

    prevqnum = qnum;
}

// The code below generates divs dynamically for each question. min size 1, max size 20

// Naming conventionss:
// Question 1 will have the following dynamic IDs
// id = qdiv1
// container element for answers / checkbox = qdiv1-cont
// container element for single checkbox and ans = qdiv1-a1cont
// answer 1 id = qdiv1-a1
// answer 1 correct/incorrect = qdiv1-a1-bool
// answer 2 id = qdiv1-a2... etc.

function createDynamicQDiv(num)
{
    var qdiv = document.createElement("div");
    qdiv.setAttribute("id", `qdiv${num+1}`);
    qdiv.classList.add("container", "div");

    var qnum = document.createElement("h1");
    qnum.setAttribute("id", `qnum${num+1}`);
    qnum.textContent = `Question ${num+1}`;
    qdiv.appendChild(qnum);

    var qtext = document.createElement("textarea");
    qtext.setAttribute("id", `qtext${num+1}`);
    qtext.classList.add("textentry");
    qdiv.appendChild(qtext);

    var qcont = document.createElement("div")
    qcont.setAttribute("id", `${qdiv.id}-cont`);
    qdiv.appendChild(qcont);

    for (i = 0; i < 4; i++) { createDynamicADiv(qcont, i+1); }

    qcontainer.appendChild(qdiv);
}

function createDynamicADiv(qcont, num)
{
    // Side-By-Side Container
    var acont = document.createElement("div");
    acont.setAttribute("id", `${qcont.parentNode.id}-a${num}cont`) //qdiv1-a1cont
    acont.classList.add("answer-container")
    qcont.appendChild(acont);

    // Checkbox button
    var checkBox = document.createElement("input")
    checkBox.type = "checkbox";
    checkBox.name = `${qcont.parentNode.id}-c${num}`;
    checkBox.setAttribute("id", `${qcont.parentNode.id}-c${num}`); //qdiv1-c1
    checkBox.classList.add("checkbox");
    acont.appendChild(checkBox);

    // Text entry field
    var ainput = document.createElement("input");
    ainput.setAttribute("id", `${qcont.parentNode.id}-a${num}`); //qdiv1-a1
    ainput.classList.add("textentry", "textentry-answer");
    acont.appendChild(ainput);
}

function finalizeQuizCreation()
{
    let qnas = [];
    if (prevqnum < 1) { return; }
    for (var i = 0; i < prevqnum; i++)
    {
        var qtxt = document.getElementById(`qtext${i+1}`).value;

        var atxt = [{},{},{},{}];
        for (var j = 0; j < 4; j++) {
            atxt[j].text = document.getElementById(`qdiv${i+1}-a${j+1}`).value;
            atxt[j].correct = document.getElementById(`qdiv${i+1}-c${j+1}`).checked;
        }

        qs = { question: qtxt, answers: atxt };
        qnas.push(qs);
    }
    storeQuestions(qnas)
}

let test = [{ // Questions for h2 tag. An array that that has objects such as `questions` `answers`
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
}];

function storeQuestions(qnas)
{
    localStorage.setItem("CustomQuiz", JSON.stringify(qnas));
    alert("Saved your quiz!");
}

function transitionPage(pageName)
{
    window.location.href = pageName;
}

startCreation();