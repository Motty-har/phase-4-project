
from flask import request, session
from flask_restful import Resource
from models import User, Coach, Review
import ipdb

from config import app, db, api
from models import User, Coach, Review

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Signup(Resource):

    def post(self):
        request_json = request.get_json()

        username = request_json.get('username')
        password = request_json.get('password')

        user = User(
            username=username
        )

        user.password_hash = password

        db.session.add(user)
        db.session.commit()
        
        return user.to_dict(), 200

class Login(Resource):
     def post(self):

        request_json = request.get_json()

        username = request_json.get('username')
        password = request_json.get('password')

        user = User.query.filter(User.username == username).first()
        if user:
            if user.authenticate(password):

                return user.to_dict(), 200

        return {'error': '401 Unauthorized'}, 401


class Coaches(Resource):

    def get(self):
        coaches = Coach.query.all()
        return [coach.to_dict() for coach in coaches]

api.add_resource(Signup, '/signup')
api.add_resource(Login, '/login')
api.add_resource(Coaches, '/coaches')
if __name__ == '__main__':
    app.run(port=5555, debug=True)

