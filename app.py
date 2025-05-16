from flask import Flask, request, jsonify, Response
from flask_cors import CORS
import cv2
import numpy as np
import base64
import os
import io
import traceback
from PIL import Image

app = Flask(__name__)
CORS(app)  # Enable CORS to allow requests from React Native

# Path to save captured images
IMAGE_SAVE_PATH = 'captured_image.jpg'

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
    try:
        data = request.get_json()
        if not data or 'image' not in data:
            return jsonify({"error": "Missing 'image' parameter"}), 400

        # Get base64 string and handle potential prefixes
        base64_string = data['image']
        
        # Check if the base64 string contains the data URI prefix and remove it if present
        if "," in base64_string:
            base64_string = base64_string.split(",")[1]
            
        # Decode base64 image
        image_data = base64.b64decode(base64_string)
        file_path = "uploaded_image.jpg"
        
        # Save the image using PIL for better cross-platform compatibility
        image = Image.open(io.BytesIO(image_data))
        image.save(file_path)
        
        # Convert to OpenCV format for processing
        np_image = np.array(image)
        if len(np_image.shape) == 3 and np_image.shape[2] == 4:  # Has alpha channel
            np_image = cv2.cvtColor(np_image, cv2.COLOR_RGBA2RGB)
        
        # Perform skin disease analysis
        result = detect_skin_disease(np_image)

        return jsonify({
            "message": "Image received and processed successfully!",
            "filename": file_path,
            "result": result
        })
        
    except Exception as e:
        print(f"Error processing image: {e}")
        traceback.print_exc()
        return jsonify({"error": f"Failed to process image: {str(e)}"}), 500

def detect_skin_disease(image):
    """
    Analyze the image to detect potential skin diseases
    For now this is a dummy implementation, replace with actual model
    """
    try:
        # Basic image analysis (example)
        # Convert to HSV for better color analysis
        hsv_image = cv2.cvtColor(image, cv2.COLOR_RGB2HSV)
        
        # Calculate average hue, saturation, value
        h, s, v = cv2.split(hsv_image)
        avg_hue = np.mean(h)
        avg_saturation = np.mean(s)
        
        # Simple rule-based classification (DUMMY example)
        if avg_saturation > 100:
            return "Possible Skin Disease: Eczema"
        elif avg_hue > 20:
            return "Possible Skin Disease: Psoriasis"
        else:
            return "No significant skin condition detected"
            
    except Exception as e:
        print(f"Error in skin disease detection: {e}")
        traceback.print_exc()
        return "Error analyzing image"

# Video streaming setup
camera = None

def get_camera():
    global camera
    if camera is None:
        camera = cv2.VideoCapture(0)
    return camera

def generate_frames():
    cam = get_camera()
    while True:
        success, frame = cam.read()
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
    cam = get_camera()
    success, frame = cam.read()
    if not success:
        return jsonify({"error": "Failed to capture image"}), 500
    
    # Save the frame as an image
    cv2.imwrite(IMAGE_SAVE_PATH, frame)

    # Analyze the captured image
    result = detect_skin_disease(frame)

    # Send a success response with analysis result
    return jsonify({
        "message": f"Image captured successfully. Saved at {IMAGE_SAVE_PATH}",
        "result": result
    }), 200

@app.route('/health', methods=['GET'])
def health_check():
    """Simple endpoint to check if the API is running"""
    return jsonify({"status": "healthy"}), 200

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=5000)