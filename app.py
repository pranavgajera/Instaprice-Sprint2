import os
import flask

app = flask.Flask(__name__)

@app.route('/')
def hello():
    return flask.render_template('index.html')

app.run(
    host=os.getenv('IP', '0.0.0.0'),
    port=int(os.getenv('PORT', 8080)),
    debug=True
)