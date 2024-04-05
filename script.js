const questions = [
    {
        question:"What is the purpose of the parseInt() function in JavaScript?",
        answers:[
            {text:"To convert a string to a floating-point number", correct:false},
            {text:"To convert a floating-point number to a string", correct:false},
            {text:"To convert a string to an integer", correct:true},
            {text:"To convert an integer to a string", correct:false},
        ]
    },
    {
        question:"What is the JavaScript operator for checking if two values are not equal, regardless of their data types?",
        answers:[
            {text:"!=", correct:false},
            {text:" !==", correct:true},
            {text:" =/=", correct:false},
            {text:"==", correct:false},
        ]
    },
    {
        question:"What is the result of typeof null in JavaScript?",
        answers:[
            {text:"undefined", correct:false},
            {text:"object", correct:true},
            {text:"null", correct:false},
            {text:"string", correct:false},
        ]
    },
    {
        question:"Which JavaScript function is used to remove the first element from an array?",
        answers:[
            {text:"shift()", correct:true},
            {text:"removeFirst()", correct:false},
            {text:"splice()", correct:false},
            {text:" delete()", correct:false},
        ]
    },
    {
        question:"How can you check the length of an array in JavaScript?",
        answers:[
            {text:"Using the length() method", correct:false},
            {text:"Using the count property", correct:false},
            {text:"Using the size() method", correct:false},
            {text:"Using the length property", correct:true},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){ 
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct  /* idk */
        }
        button.addEventListener("click", selectAnswer);
        
        
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
    answerButtons.removeChild(answerButtons.firstChild)
}
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})


startQuiz();