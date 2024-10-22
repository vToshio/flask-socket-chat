from flask import Blueprint, render_template, redirect, url_for, session, request

views = Blueprint('views', __name__)

@views.route('/')
def login():
    pass

@views.route('/auth-login', methods=['POST'])
def auth_login():
    pass

@views.route('/chat')
def chat():
    pass