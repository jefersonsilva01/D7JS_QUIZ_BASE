// INITIAL DATA
let currentQuestion = 0;
let correctAnswer = 0;

showQuestion();

// EVENTS
document.querySelector('.scoreArea button').addEventListener('click', reset);

// FUNCTIONS
function showQuestion(){
    if(questions[currentQuestion]){
        let question = questions[currentQuestion];

        let percent = Math.floor((currentQuestion / questions.length) * 100);
        document.querySelector('.progress--bar').style.width = `${percent}%`;

        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';

        document.querySelector('.question').innerHTML = question.question;
        document.querySelector('.options').innerHTML = '';

        let options = '';
        for(let i in question.options){
            options += `<div data-op="${i}" class="option"><span>${parseInt(i) + 1}</span> ${question.options[i]}</div>`;
        }
        document.querySelector('.options').innerHTML = options;

        document.querySelectorAll('.options .option').forEach( item => {
            item.addEventListener('click', optionClickEvent);
        });
        
    } else {
        finishQuiz();
    }
}

function optionClickEvent(e){
    let clickedOption = parseInt(e.target.getAttribute('data-op'));

    if(questions[currentQuestion].answer == clickedOption){
        correctAnswer += 1;
    }

    currentQuestion += 1;
    showQuestion();
}

function finishQuiz() {
    let points = Math.floor((correctAnswer / questions.length) * 100);
    
    if(points < 30){
        document.querySelector('.scoreText1').innerHTML = `Precisa estudar mais.`;
        document.querySelector('.scorePct').style.color = '#FF0000';
    } else if(points >= 30 && points < 70){
        document.querySelector('.scoreText1').innerHTML = `Muito Bom`;
        document.querySelector('.scorePct').style.color = '#FFFF00';
    } else if(points >= 70){
        document.querySelector('.scoreText1').innerHTML = `Parabéns`;
        document.querySelector('.scorePct').style.color = '#0D630D';
    }
    
    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
    document.querySelector('.scoreText2').innerHTML = `Voce respondeu ${questions.length} questões e acertou ${correctAnswer}.`;
    
    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.progress--bar').style.width = `100%`;
}

function reset(){
    currentQuestion = 0;
    correctAnswer = 0;
    
    showQuestion();
}