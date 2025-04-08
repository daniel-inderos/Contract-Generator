# Contract Generator (Client-Side)

This is a **fully client-side** web application that generates contracts based on user input using OpenAI's GPT model. The application runs entirely in your browser using HTML, Tailwind CSS, and vanilla JavaScript. It requires the user to provide their own OpenAI API key, which is stored locally in the browser's `localStorage`.

**Important Security Note:** Storing API keys in `localStorage` is convenient but **not secure for production environments**. The key is stored unencrypted and could potentially be accessed by malicious scripts or browser extensions. Use this application with the understanding that your API key is stored directly in your browser.

## Features

- Interactive questionnaire for contract details
- AI-powered contract generation using OpenAI's GPT model (requires user's API key)
- Simple and intuitive user interface styled with Tailwind CSS
- Client-side PDF download functionality for generated contracts
- API key is stored in browser `localStorage` for convenience
- No backend required; runs entirely in the browser.
- Easily deployable as a static website on platforms like Vercel, Netlify, GitHub Pages, etc.

## Prerequisites

- A modern web browser (Chrome, Firefox, Safari, Edge, etc.)
- An OpenAI API key

## How to Use

1.  **Open `index.html`:** Simply open the `index.html` file directly in your web browser, or deploy the project folder to a static web host.
2.  **Enter API Key:** When prompted, enter your OpenAI API key. Click "Save Key". The key will be stored in your browser's `localStorage` for future visits.
3.  **Answer Questions:** Once the key is saved, the questionnaire will appear. Answer the questions presented.
4.  **Generate Contract:** Click "Generate Contract" after answering all questions.
5.  **View & Download:** View the AI-generated contract. Click "Download as PDF" to save it.

## Obtaining an OpenAI API Key

1.  Go to https://platform.openai.com/
2.  Sign up or log in to your OpenAI account.
3.  Navigate to the API keys section.
4.  Create a new secret key.
5.  Copy the key and paste it into the application when prompted.

**Remember to keep your API key confidential.**

## Deployment (Static Hosting)

You can deploy this project folder to any static web hosting service:

*   **Vercel/Netlify:** Connect your Git repository (GitHub, GitLab, etc.) and deploy. No special build configuration is needed.
*   **GitHub Pages:** Enable GitHub Pages for your repository.
*   **Other Hosts:** Upload the project files (`index.html`, `static/` folder) to your host.

No environment variables need to be set on the hosting platform, as the API key is managed client-side.

## Project Structure

- `index.html`: Main HTML file with Tailwind CSS (via CDN) and structure.
- `static/script.js`: JavaScript for handling API key storage, user interactions, direct OpenAI API calls, and client-side PDF generation.
- `.gitignore`: Specifies intentionally untracked files that Git should ignore.
- `.env.example`: (No longer functionally used, but kept for reference if needed)
- `README.md`: This file.

## Contributing

Contributions to the Contract Generator project are welcome. Please feel free to submit a Pull Request.

## Disclaimer

This application is for demonstration purposes only. Storing API keys in the browser is insecure. The generated contracts should not be considered legally binding or used without review by a qualified legal professional.