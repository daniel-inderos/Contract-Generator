const questions = [
    "What is the purpose of this contract?",
    "Who are the parties involved?",
    "What is the duration of the contract?",
    "What are the main terms and conditions?",
    "Are there any specific clauses you want to include?"
];

let currentQuestion = 0;
const answers = Array(questions.length).fill('');
let apiKey = ''; // Variable to hold the API key

// Function to save API key to localStorage
function saveApiKey() {
    const input = document.getElementById('apiKeyInput');
    const status = document.getElementById('apiKeyStatus');
    if (input.value.trim()) {
        apiKey = input.value.trim();
        localStorage.setItem('openai_api_key', apiKey);
        status.textContent = 'API Key saved successfully!';
        status.className = 'text-sm mt-1 text-green-600';
        checkApiKey(); // Re-check to potentially hide the section
        input.value = ''; // Clear input after saving
    } else {
        status.textContent = 'Please enter a valid API Key.';
        status.className = 'text-sm mt-1 text-red-600';
    }
}

// Function to load API key from localStorage and update UI
function checkApiKey() {
    apiKey = localStorage.getItem('openai_api_key');
    const apiKeySection = document.getElementById('apiKeySection');
    const questionContainer = document.getElementById('questionContainer');
    const status = document.getElementById('apiKeyStatus');

    if (apiKey) {
        apiKeySection.style.display = 'none'; // Hide if key exists
        questionContainer.style.display = 'block'; // Show questions
    } else {
        apiKeySection.style.display = 'block'; // Show if key missing
        questionContainer.style.display = 'none'; // Hide questions
        status.textContent = 'API Key not found. Please enter it above.';
        status.className = 'text-sm mt-1 text-red-600';
    }
}

function updateQuestion() {
    // Ensure API key exists before proceeding
    if (!apiKey) {
        checkApiKey();
        return;
    }
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
    
    updateProgressIndicator();
}

function updateProgressIndicator() {
    const progressIndicator = document.getElementById('progressIndicator');
    progressIndicator.innerHTML = '';
    for (let i = 0; i < questions.length; i++) {
        const dot = document.createElement('div');
        dot.className = `progressDot ${i === currentQuestion ? 'active' : ''}`;
        progressIndicator.appendChild(dot);
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

// Updated handleSubmit to call OpenAI directly from the client
async function handleSubmit() {
    answers[currentQuestion] = document.getElementById('answer').value;
    
    if (!apiKey) {
        alert('OpenAI API Key is missing. Please enter it first.');
        checkApiKey();
        return;
    }

    document.getElementById('questionContainer').style.display = 'none';
    document.getElementById('contractContainer').style.display = 'block';
    document.getElementById('loadingIndicator').style.display = 'flex'; // Use flex for centering
    document.getElementById('contract').style.display = 'none';
    document.getElementById('downloadBtn').style.display = 'none';

    const combinedAnswers = answers.map((ans, index) => `${questions[index]}\n${ans}`).join('\n\n');

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}` // Use the stored API key
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: "You are a helpful assistant that generates contracts based on user input. Respond with the contract text first, followed by two newlines, then a JSON object containing the suggested filename like this: {\\\"file_name\\\": \\\"your_suggested_filename.txt\\\"}" },
                    { role: "user", content: `Generate a contract based on the following information:\n\n${combinedAnswers}` }
                ]
            }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`OpenAI API Error: ${response.status} ${response.statusText} - ${errorData?.error?.message || 'Unknown error'}`);
        }

        const data = await response.json();
        const rawResponse = data.choices[0]?.message?.content;

        if (!rawResponse) {
            throw new Error("Invalid response structure from OpenAI API.");
        }

        // Parse the response from OpenAI
        const parts = rawResponse.trim().split('\n\n'); // Split only once if possible
        if (parts.length < 2) { // Need at least contract and JSON part
             console.error("OpenAI response format error:", rawResponse);
             throw new Error("OpenAI response did not contain the expected contract and filename structure.");
        }

        // Assume the last part is the JSON
        const fileNameJsonStr = parts.pop(); // Get last part
        const contract = parts.join('\n\n'); // Join the rest as contract text
        let fileName;

        try {
            const fileNameData = JSON.parse(fileNameJsonStr);
            fileName = fileNameData.file_name;
            if (!fileName || typeof fileName !== 'string') {
                 throw new Error("Invalid or missing 'file_name' in JSON part of response.");
            }
        } catch (jsonError) {
            console.error("Error parsing filename JSON:", jsonError, "String was:", fileNameJsonStr);
            // Fallback or re-throw if needed, here we'll use a default name
            console.warn("Could not parse filename from OpenAI, using default.");
            fileName = 'generated_contract.txt'; // Default filename on parsing error
        }

        document.getElementById('loadingIndicator').style.display = 'none';
        document.getElementById('contract').style.display = 'block';
        document.getElementById('downloadBtn').style.display = 'inline-block';
        document.getElementById('contract').textContent = contract;
        document.getElementById('downloadBtn').setAttribute('data-filename', fileName);

    } catch (error) {
        console.error('Error generating contract:', error);
        document.getElementById('loadingIndicator').style.display = 'none';
        document.getElementById('contract').style.display = 'block';
        document.getElementById('contract').textContent = `An error occurred: ${error.message}. Please check your API key and network connection.`;
        document.getElementById('downloadBtn').style.display = 'none';
    }
}

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    const contractText = document.getElementById('contract').textContent;
    
    doc.setFontSize(12);
    // Basic check for jsPDF text splitting capability
    let splitText;
    if (doc.splitTextToSize) {
        splitText = doc.splitTextToSize(contractText, 180);
    } else {
        console.warn('jsPDF splitTextToSize not available, using basic text.');
        splitText = contractText; // Fallback if method doesn't exist
    }
    doc.text(splitText, 15, 15);
    
    const fileName = document.getElementById('downloadBtn').getAttribute('data-filename') || 'generated_contract.pdf';
    
    // Ensure filename ends with .pdf for consistency
    const pdfFileName = fileName.endsWith('.pdf') ? fileName : `${fileName.replace(/\.txt$/i, '') || 'contract'}.pdf`;
    
    doc.save(pdfFileName);
}

// Initial setup on page load
checkApiKey(); // Check for existing key first
if (apiKey) {
    updateQuestion(); // If key exists, show the first question
}