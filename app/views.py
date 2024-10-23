from flask import Blueprint, render_template, redirect, url_for, session, request

views = Blueprint('views', __name__)

@views.route('/')
def login():
    session['username'] = None
    session['ip'] = None
    return render_template('login.html', titulo='Login')

@views.route('/auth-login', methods=['POST'])
def auth_login():
    proxima = request.form['proxima']
    session['username'] = request.form['username']
    session['ip'] = request.remote_addr
    return redirect(proxima)

@views.route('/chat')
def chat():
    if 'username' not in session.keys() or session['username'] is None:
        return redirect(url_for('views.login', proxima=url_for('views.chat')))
    return render_template('chat.html', titulo='Socket Chat', session=session)