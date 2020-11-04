import os
import flask
import flask_socketio
from dotenv import load_dotenv
app = flask.Flask(__name__)
app = flask.Flask(__name__)
socketio = flask_socketio.SocketIO(app)
socketio.init_app(app, cors_allowed_origins="*")
@app.route('/')
def hello():
    return flask.render_template('index.html')


@socketio.on('new google user')
def on_new_google_user(data):
    print("Got an event for new google user input with data:", data)
    print('Someone connected! with google')

@socketio.on('disconnect')
def on_disconnect():
    print('Someone disconnected!')



if __name__ == '__main__':
    socketio.run(
        app,
        host=os.getenv('IP', '0.0.0.0'),
        port=int(os.getenv('PORT', 8080)),
        debug=True
    )