# Contract Generator

This is a simple web application that generates contracts based on user input using OpenAI's GPT model. The application is built with Python, Flask, and JavaScript.

## Features

- Interactive questionnaire for contract details
- AI-powered contract generation using OpenAI's GPT model
- Simple and intuitive user interface

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Python 3.7+
- pip (Python package manager)
- An OpenAI API key

## Setup Instructions

1. **Create a Virtual Environment**:
   ```bash
   python -m venv venv
   ```

2. **Activate the Virtual Environment**:
   - On macOS/Linux:
     ```bash
     source venv/bin/activate
     ```
   - On Windows:
     ```bash
     venv\Scripts\activate
     ```

3. **Install Dependencies**:
   ```bash
   pip install flask python-dotenv openai
   ```

4. **Run the Application**:
   ```bash
   python app.py
   ```

## Usage

1. Open a web browser and navigate to `http://127.0.0.1:5000/`

2. Answer the questions presented in the interface.

3. Click "Generate Contract" when you've completed all questions.

4. View the AI-generated contract based on your inputs.

## Project Structure

- `app.py`: Main Flask application file
- `templates/index.html`: HTML template for the web interface
- `static/style.css`: CSS styles for the web interface
- `static/script.js`: JavaScript for handling user interactions
- `.env`: Environment file for storing the OpenAI API key

## Contributing

Contributions to the Contract Generator project are welcome. Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This application is for demonstration purposes only. The generated contracts should not be considered legally binding or used without review by a qualified legal professional.