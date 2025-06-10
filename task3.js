const quizData = [
    {
      question: "Which language runs in a web browser?",
      a: "Java",
      b: "C",
      c: "Python",
      d: "JavaScript",
      correct: "d"
    },
    {
      question: "What does CSS stand for?",
      a: "Central Style Sheets",
      b: "Cascading Style Sheets",
      c: "Cascading Simple Sheets",
      d: "Cars SUVs Sailboats",
      correct: "b"
    },
    {
      question: "What does HTML stand for?",
      a: "HyperText Markup Language",
      b: "HyperText Markdown Language",
      c: "HyperLoop Machine Language",
      d: "Helicopters Terminals Motorboats Lambos",
      correct: "a"
    },
    {
      question: "Which HTML tag is used to define an internal style sheet?",
      a: "<style>",
      b: "<css>",
      c: "<script>",
      d: "<link></link>",
      correct: "a"
    },
    {
      question: "Which of the following is NOT a JavaScript data type?",
      a: "String",
      b: "Number",
      c: "Boolean",
      d: "Float",
      correct: "d"
    }
  ];
  
  let currentQuiz = 0;
  let score = 0;
  
  const quiz = document.getElementById("quiz");
  const questionEl = document.getElementById("question");
  const answerEls = document.querySelectorAll(".answer");
  const a_text = document.getElementById("a_text");
  const b_text = document.getElementById("b_text");
  const c_text = document.getElementById("c_text");
  const d_text = document.getElementById("d_text");
  const submitBtn = document.getElementById("submit");
  
  loadQuiz();
  
  function loadQuiz() {
    deselectAnswers();
    const currentQuizData = quizData[currentQuiz];
    questionEl.textContent = currentQuizData.question;
    a_text.textContent = currentQuizData.a;
    b_text.textContent = currentQuizData.b;
    c_text.textContent = currentQuizData.c;
    d_text.textContent = currentQuizData.d;
  }
  
  function deselectAnswers() {
    answerEls.forEach(answer => (answer.checked = false));
  }
  
  function getSelected() {
    let answer;
    answerEls.forEach(el => {
      if (el.checked) {
        answer = el.id;
      }
    });
    return answer;
  }
  
  submitBtn.addEventListener("click", () => {
    const answer = getSelected();
  
    if (answer) {
      if (answer === quizData[currentQuiz].correct) {
        score++;
      }
  
      currentQuiz++;
  
      if (currentQuiz < quizData.length) {
        loadQuiz();
      } else {
        quiz.innerHTML = `
          <h2>You answered ${score}/${quizData.length} questions correctly.</h2>
          <button onclick="location.reload()">Reload Quiz</button>
        `;
        fetchJoke(); // Show joke after quiz ends
      }
    } else {
      alert("Please select an answer!");
    }
  });
  
  // Joke fetching function
  function fetchJoke() {
    const setup = document.getElementById("jokeSetup");
    const punchline = document.getElementById("jokePunchline");
    const jokeContainer = document.getElementById("jokeContainer");
  
    setup.textContent = "Loading a joke for you...";
    punchline.textContent = "";
    jokeContainer.classList.remove("hidden");
  
    fetch("https://official-joke-api.appspot.com/random_joke")
      .then(res => res.json())
      .then(data => {
        setup.textContent = data.setup;
        punchline.textContent = data.punchline;
      })
      .catch(error => {
        setup.textContent = "Oops! Couldn't load the joke.";
        punchline.textContent = "";
        console.error("Joke fetch failed:", error);
      });
  }
  