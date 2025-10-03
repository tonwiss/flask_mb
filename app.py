from flask import Flask, render_template, request, redirect, url_for, session, flash, get_flashed_messages
from flask_migrate import Migrate
import sqlite3
import os
from db.models import db, User
from config.config import Config
import sqlalchemy
from flask_login import LoginManager, login_user, logout_user, login_required
from werkzeug.security import generate_password_hash

app = Flask(__name__)
app.config.from_object(Config)

db.init_app(app)
migrate = Migrate(app, db)

with app.app_context():
    db.create_all()

login_manager = LoginManager(app)
login_manager.login_view = "login"

    
@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))


@app.route("/")
def index():
    return render_template("index.html")

@app.route("/register", methods=["GET", "POST"])
def register():
    print(get_flashed_messages())
    if request.method == "POST":
        
        username = request.form["username"]
        password = request.form["password"]

        if User.query.filter_by(username=username).first():
            flash("Такой пользователь уже есть!")
            return redirect(url_for("register"))

        new_user = User(
            username=username,
            password_hash=generate_password_hash(password)
        )
        db.session.add(new_user)
        db.session.commit()
        flash("Регистрация успешна, войдите в аккаунт.")
        return redirect(url_for("login"))
    return render_template("register.html")

@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for("index"))

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]

        user = User.query.filter_by(username=username).first()
        if user and user.check_password(password):
            login_user(user)
            return redirect(url_for("index"))
        else:
            flash("Неверный логин или пароль.")
    return render_template("login.html")

@app.route("/menu")
def menu():
    if "username" not in session:
        return redirect(url_for("index"))
    return render_template("menu.html", username=session["username"])


@app.route("/game", endpoint='game')
def game():
    if "username" not in session:
        return redirect(url_for("index"))
    return render_template("game.html", username=session["username"])


if __name__ == "__main__":
    app.run(debug=True)