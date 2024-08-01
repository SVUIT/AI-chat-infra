from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit
from flask_cors import CORS

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
cors = CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

connected_users = {}

@app.route('/')
def index():
    return "Flask Socket.IO Server"

@socketio.on('client_event')
def handle_client_event(json):
    print('received event: ' + str(json))
    socket_id = request.sid
    print(f"Event received from {socket_id}: {json}")
    emit('server_response', {'message': 'Event received'})

@socketio.on('connect')
def connect():
    socket_id = request.sid
    connected_users[socket_id] = request.remote_addr
    print(f"User {socket_id} connected. IP: {request.remote_addr}")
    emit('server_response', {'message': 'Connected'}, to=socket_id)
    print_connected_users()

@socketio.on('disconnect')
def disconnect():
    socket_id = request.sid
    if socket_id in connected_users:
        del connected_users[socket_id]
    print(f"User {socket_id} disconnected.")
    print_connected_users()
    


@app.route('/send_message', methods=['POST'])
def send_message():
    message = request.json.get('message', '')
    socket_id = request.sid
    if message:
        socketio.emit('server_response', {'message': message})
        print(f"Message sent to {socket_id}: {message}")
        return jsonify({'status': 'success', 'message': 'Message sent!'})
    else:
        return jsonify({'status': 'failure', 'message': 'No message provided'}), 400

@app.route('/connected_users', methods=['GET'])
def get_connected_users():
    return jsonify(connected_users)

def print_connected_users():
    print("Connected users:")
    for socket_id, ip in connected_users.items():
        print(f"Socket ID: {socket_id}, IP: {ip}")



if __name__ == '__main__':
    socketio.run(app, debug=True)
