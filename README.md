# Contract Generator

This is a web application that generates contracts based on user input using OpenAI's GPT model. The application is built with Python, Flask, and JavaScript.

## Features

- Interactive questionnaire for contract details
- AI-powered contract generation using OpenAI's GPT model
- Simple and intuitive user interface
- PDF download functionality for generated contracts

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Python 3.7+
- pip (Python package manager)
- An OpenAI API key

## Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd contract-generator
   ```

2. **Create a Virtual Environment**:
   ```bash
   python -m venv venv
   ```

3. **Activate the Virtual Environment**:
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```

4. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

5. **Set up environment variables**:
   Create a `.env` file in the root directory and add your OpenAI API key:
   ```
   OPENAI_API_KEY=your_api_key_here
   ```

   To obtain an OpenAI API key:
   1. Go to https://platform.openai.com/
   2. Sign up or log in to your OpenAI account
   3. Navigate to the API keys section
   4. Create a new secret key
   5. Copy the key and paste it into your `.env` file

   Note: Keep your API key confidential and never share it publicly.

6. **Run the Application**:
   ```bash
   python app.py
   ```

## Usage

1. Open a web browser and navigate to `http://127.0.0.1:5000/`
2. Answer the questions presented in the interface.
3. Click "Generate Contract" when you've completed all questions.
4. View the AI-generated contract based on your inputs.
5. Download the contract as a PDF if desired.

## Project Structure

- `app.py`: Main Flask application file
- `templates/index.html`: HTML template for the web interface
- `static/style.css`: CSS styles for the web interface
- `static/script.js`: JavaScript for handling user interactions
- `.env`: Environment file for storing the OpenAI API key
- `requirements.txt`: List of Python dependencies

## Contributing

Contributions to the Contract Generator project are welcome. Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This application is for demonstration purposes only. The generated contracts should not be considered legally binding or used without review by a qualified legal professional.