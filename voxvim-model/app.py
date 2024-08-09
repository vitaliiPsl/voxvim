import os

import whisper

from werkzeug.utils import secure_filename
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'mp4', 'avi', 'mov', 'mkv'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


model = whisper.load_model("small")


@app.route('/transcribe', methods=['POST'])
def transcribe_video():
    if 'file' not in request.files:
        return jsonify({"error": "No video file provided"}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if not file or not allowed_file(file.filename):
        return jsonify({"error": "File type not allowed"}), 400

    filename = secure_filename(file.filename)
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    print(filepath)
    file.save(filepath)

    try:
        result = model.transcribe(filepath)
        transcription = {
            'text': result['text'],
            'segments': result['segments']
        }
    except Exception as e:
        os.remove(filepath)
        return jsonify({"error": f"Transcription failed: {str(e)}"}), 500

    os.remove(filepath)

    return jsonify(transcription)


if __name__ == '__main__':
    os.makedirs(UPLOAD_FOLDER, exist_ok=True)
    app.run(debug=True)
