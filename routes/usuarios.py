from flask import Blueprint, request, jsonify, session
from services.usuarios_queries import User_queries
from services.roles_queries import RolesQueries
from datetime import datetime
from flask import render_template

usuarios = Blueprint('usuarios', __name__)

@usuarios.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"error": "Faltan campos requeridos"}), 400

    usuario = User_queries.login(username, password)
    if usuario:
        session['user_id'] = usuario.id  
        session['username'] = usuario.nombre
        session['login_time'] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        return jsonify({
            "message": f"Bienvenido, {usuario.nombre}!",
            "redirect": "/inicio"
        }), 200
    return jsonify({"error": "Datos incorrectos"}), 401



@usuarios.route('/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({"message": "Sesión cerrada correctamente", "redirect": "/login"}), 200


@usuarios.route('/usuario/info', methods=['GET'])
def obtener_usuario_info():
    usuario_id = session.get('user_id')
    usuario_nombre = session.get('username')
    hora_ingreso = session.get('login_time')

    if  not usuario_id or not usuario_nombre or not hora_ingreso:
        return jsonify({"error": "No hay usuario autenticado"}), 401
    
    return jsonify({
        "usuario": {
            "id": usuario_id,
            "nombre": usuario_nombre,
            "hora_ingreso": hora_ingreso
        }

    }), 200
