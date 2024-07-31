const quiz = [
  {
    question: "What does HTML stand for?",
    answers: ["HyperText Markup Language", "Home Tool Markup Language", "HyperLinks and Text Markup Language", "Hyper Tool Markup Language"],
    correctanswer: 0
  },
  {
    question: "What does the 'C' in CSS stand for?",
    answers: ["Creative", "Cascading", "Coding", "Colorful"],
    correctanswer: 1
  },
  {
    question: "Which JavaScript method is used to select an element by its ID?",
    answers: ["getElementById()", "querySelector()", "getElementsByClassName()", "getElementByTag()"],
    correctanswer: 0
  },
  {
    question: "Which HTML element is used to define a hyperlink?",
    answers: ["<link>", "<a>", "<href>", "<hyperlink>"],
    correctanswer: 1
  }
];


let correctanswer = 0;
let questionIndex = -1;
const startBtn = document.querySelector(".strat-btn");
const quizContainer = document.querySelector(".quiz-container");
let answered = false;


startBtn.addEventListener("click",()=>{
  hiddenPage();
  nextQuestion();
});
function hiddenPage(){
    const page = document.querySelector(".page");
    page.classList.add("hidden");
    page.remove();
}
function nextQuestion(){
    questionIndex++;
    if(questionIndex===quiz.length){
        finalPage();
        return;
    }
    const page = document.createElement("div");
    page.className= "page"; 
    quizContainer.appendChild(page);
    const questionContainer = document.createElement("h4");
    questionContainer.className= "question";
    page.appendChild(questionContainer);
    const answerContainer = document.createElement("div");
    answerContainer.className = "answer-container";
    page.appendChild(answerContainer);
    answered = false;
    

    const submitButton = document.createElement("button");
    submitButton.className ="next-button";


    questionContainer.textContent = quiz[questionIndex].question;
    quiz[questionIndex].answers.forEach((answer , index) => {
      
      const element = document.createElement("button");
      element.className = "answer";
      answerContainer.appendChild(element);
      element.textContent = answer;
      
      element.addEventListener("click" , ()=>{
         if(answered) return;
         if(index === quiz[questionIndex].correctanswer){
             element.classList.add("correct");
             correctanswer++;
         }else{
             element.classList.add("worng");
         }
         
         answered = true;
         enable(submitButton);
      });
      
    });  
   
    page.appendChild(submitButton);
    submitButton.textContent= "Next Question";
}
function enable(submitButton){
  submitButton.classList.add('enabled');
  submitButton.addEventListener("click", ()=>{
    hiddenPage();
    nextQuestion();
  });
}

function  finalPage(){
  const page = document.createElement("div");
  page.className = "page";

  if (correctanswer > quiz.length / 2) {
    page.innerHTML = `
      <div class="result-container" style="text-align: center; animation: pulse 1s infinite;">
        <h1 class="question" style="font-size: 2.5rem; color: #28a745; animation: bounce 0.6s ease-out;">
          🎉 You Are a Web Dev Wizard! 🧙‍♂️
        </h1>
        <p class="score" style="font-size: 1.5rem; color: #555;">
          Your score is <span style="color: #28a745;">${correctanswer}/${quiz.length}</span>
        </p>
        <p style="font-size: 1.2rem; color: #777;">
          Keep coding and stay awesome! 🚀
        </p>
      </div>
    `;
  } else if (correctanswer < quiz.length / 2) {
    page.innerHTML = `
      <div class="result-container" style="text-align: center; animation: shake 0.5s;">
        <h1 class="question" style="font-size: 2.5rem; color: #dc3545; animation: wobble 1s ease-out;">
          Oops! Back to the Drawing Board 🥲
        </h1>
        <p class="score" style="font-size: 1.5rem; color: #555;">
          Your score is <span style="color: #dc3545;">${correctanswer}/${quiz.length}</span>
        </p>
        <p style="font-size: 1.2rem; color: #777;">
          Don't give up, you’re on your way! 💪
        </p>
      </div>
    `;
  } else {
    page.innerHTML = `
      <div class="result-container" style="text-align: center; animation: fade-in 0.8s;">
        <h1 class="question" style="font-size: 2.5rem; color: #ffc107; animation: swing 0.8s ease-out;">
          Not Bad! You’re Almost There 😎
        </h1>
        <p class="score" style="font-size: 1.5rem; color: #555;">
          Your score is <span style="color: #ffc107;">${correctanswer}/${quiz.length}</span>
        </p>
        <p style="font-size: 1.2rem; color: #777;">
          A little more practice, and you’ll be unstoppable! 🏆
        </p>
      </div>
    `;
  }
  
  quizContainer.appendChild(page);
}
