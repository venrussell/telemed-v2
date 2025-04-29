
from flask import Flask, request, jsonify, Response  # Added Response to imports
from flask_cors import CORS
import cv2
import numpy as np
import base64
import os

app = Flask(__name__)
CORS(app)  # Enable CORS to allow requests from React Native

@app.route('/')
def home():
    return jsonify({"message": "Flask API is running!"})

@app.route('/analyze', methods=['POST'])
def analyze():
    data = request.get_json()
    if not data or 'text' not in data:
        return jsonify({"error": "Missing 'text' parameter"}), 400

    text = data['text']
    return jsonify({"message": f"Processed text: {text.upper()}"})

@app.route('/upload', methods=['POST'])
def upload_image():
    data = request.get_json()
    if not data or 'image' not in data:
        return jsonify({"error": "Missing 'image' parameter"}), 400

    # Decode base64 image
    image_data = base64.b64decode(data['image'])
    file_path = "uploaded_image.jpg"

    with open(file_path, "wb") as img_file:
        img_file.write(image_data)

    # Perform skin disease analysis (Dummy processing for now)
    result = detect_skin_disease(file_path)

    return jsonify({"message": "Image received successfully!", "filename": file_path, "result": result})

def detect_skin_disease(image_path):
    # Load image using OpenCV
    image = cv2.imread(image_path)
    
    # Dummy response for now, replace with real model
    return "Possible Skin Disease: Eczema"

camera = cv2.VideoCapture(0)

# Path to save captured images
IMAGE_SAVE_PATH = 'captured_image.jpg'

def generate_frames():
    while True:
        success, frame = camera.read()
        if not success:
            break
        else:
            # Resize frame for better performance
            frame = cv2.resize(frame, (640, 480))

            # Encode the frame as JPEG
            _, buffer = cv2.imencode('.jpg', frame)
            frame_bytes = buffer.tobytes()

            # Yield frame in multipart format for streaming
            yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame_bytes + b'\r\n')

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(),
                    mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/capture_image', methods=['GET'])
def capture_image():
    """Capture the current frame and save it as an image."""
    success, frame = camera.read()
    if not success:
        return jsonify({"error": "Failed to capture image"}), 500
    
    # Save the frame as an image
    cv2.imwrite(IMAGE_SAVE_PATH, frame)

    # Send a success response
    return jsonify({"message": f"Image captured successfully. Saved at {IMAGE_SAVE_PATH}"}), 200

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)