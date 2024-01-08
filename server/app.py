#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request
from flask_restful import Resource
from models import User, Coach, Review
# Local imports
from config import app, db, api
import ipdb
# Add your model imports

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Signup(Resource):

    def post(self):
        ipdb.set_trace()
        request_json = request.get_json()

        username = request_json.get('username')
        password = request_json.get('password')

        user = User(
            username=username
        )

        user.password_hash = password

        db.session.add(user)
        db.session.commit()

class Coaches(Resource):

    def get(self):
        coaches = Coach.query.all()
        return [coach.to_dict() for coach in coaches]

api.add_resource(Signup, '/signup')
api.add_resource(Coaches, '/coaches')
if __name__ == '__main__':
    app.run(port=5555, debug=True)

