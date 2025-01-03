import cv2
import base64
import sys
import json


def send_frame_to_electron(frame):
    encode_param = [int(cv2.IMWRITE_JPEG_QUALITY), 95]
    _, buffer = cv2.imencode('.jpg', frame, encode_param)
    frame_base64 = base64.b64encode(buffer).decode('utf-8')
    message = json.dumps({"type": "frame", "data": frame_base64})
    print(message, flush=True)  # Assurez-vous que chaque message est suivi d'une nouvelle ligne


video_device_index = 0

cap = cv2.VideoCapture(video_device_index)

if not cap.isOpened():
    error_message = json.dumps({"type": "error", "data": "Impossible d'accéder à la carte de capture vidéo."})
    print(error_message, flush=True)
    exit()

while True:
    ret, frame = cap.read()
    if not ret:
        error_message = json.dumps({"type": "error", "data": "Impossible de lire la vidéo."})
        print(error_message, flush=True)
        break

    send_frame_to_electron(frame)

cap.release()
