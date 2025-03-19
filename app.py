from flask import Flask, session, send_from_directory, redirect, jsonify
from utils.db import db
from routes.usuarios import usuarios
from routes.base_tickets import base_tickets
from routes.mis_proyectos import mis_proyectos
from models.Roles import Roles
from models.Permisos import Permisos
from models.Grupos import Grupos
from models.Users import Usuarios
from models.Tickets import Tickets, Adjuntos
from flask_cors import CORS


app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*", "methods": ["GET", "POST", "PUT", "DELETE"], "allow_headers": ["Content-Type", "Authorization"]}})

app.secret_key = 'secret_key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root@localhost:3306/apis'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SESSION_TYPE'] = 'filesystem'


db.init_app(app)

app.register_blueprint(usuarios)
app.register_blueprint(mis_proyectos)
app.register_blueprint(base_tickets)


@app.route('/')
def serve_frontend():
    return send_from_directory('static', 'login.html')

@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('static', path)

@app.route('/inicio')
def inicio():
    if not session.get('user_id'):
        return redirect('/login')
    return send_from_directory('static/inicio', 'inicio.html')

@app.route('/mis_proyectos')
def vista_mis_proyectos():
    if not session.get('user_id'):
        return redirect('/login')
    return send_from_directory('static/mis_proyectos', 'mis_proyectos.html')


@app.route('/login')
def login():
    return send_from_directory('static', 'login.html')