from flask import Flask,render_template,redirect

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/desktop_game')
def desktop_game():
    return render_template('snake_ladder_desktop.html')

@app.route('/mobile_game')
def mobile_game():
    return render_template('snake_ladder_mobile.html')

if __name__ == '__main__':
    app.run(debug = True)