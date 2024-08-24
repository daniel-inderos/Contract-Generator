const questions = [
    "What is the purpose of this contract?",
    "Who are the parties involved?",
    "What is the duration of the contract?",
    "What are the main terms and conditions?",
    "Are there any specific clauses you want to include?"
];

let currentQuestion = 0;
const answers = Array(questions.length).fill('');

function updateQuestion() {
    document.getElementById('question').textContent = questions[currentQuestion];
    document.getElementById('answer').value = answers[currentQuestion];
    document.getElementById('previousBtn').disabled = currentQuestion === 0;
    
    if (currentQuestion === questions.length - 1) {
        document.getElementById('nextBtn').style.display = 'none';
        document.getElementById('submitBtn').style.display = 'inline-block';
    } else {
        document.getElementById('nextBtn').style.display = 'inline-block';
        document.getElementById('submitBtn').style.display = 'none';
    }
}

function handleNext() {
    answers[currentQuestion] = document.getElementById('answer').value;
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        updateQuestion();
    }
}

function handlePrevious() {
    answers[currentQuestion] = document.getElementById('answer').value;
    if (currentQuestion > 0) {
        currentQuestion--;
        updateQuestion();
    }
}

async function handleSubmit() {
    answers[currentQuestion] = document.getElementById('answer').value;
    try {
        const response = await fetch('/generate-contract', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ answers }),
        });
        const data = await response.json();
        document.getElementById('questionContainer').style.display = 'none';
        document.getElementById('contractContainer').style.display = 'block';
        document.getElementById('contract').textContent = data.contract;
    } catch (error) {
        console.error('Error generating contract:', error);
    }
}

updateQuestion();