from flask import Flask, request, jsonify, render_template, send_file
from dotenv import load_dotenv
import os
from openai import OpenAI
import io

load_dotenv()

app = Flask(__name__)
openai_client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate-contract', methods=['POST'])
def generate_contract():
    answers = request.json['answers']
    
    try:
        completion = openai_client.chat.completions.create(
            model="gpt-4o-mini",
            messages=[
                {"role": "system", "content": "You are a helpful assistant that generates contracts based on user input."},
                {"role": "user", "content": f"Generate a contract based on the following information: {answers}"}
            ]
        )
        contract = completion.choices[0].message.content
        return jsonify({"contract": contract})
    except Exception as e:
        print(f"Error: {str(e)}")
        return jsonify({"error": "An error occurred while generating the contract."}), 500

@app.route('/download-pdf', methods=['POST'])
def download_pdf():
    contract_text = request.json['contract']
    
    buffer = io.BytesIO()
    buffer.write(contract_text.encode('utf-8'))
    buffer.seek(0)
    
    return send_file(
        buffer,
        as_attachment=True,
        download_name='generated_contract.pdf',
        mimetype='application/pdf'
    )

if __name__ == '__main__':
    app.run(debug=True)