#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request
from flask_restful import Resource
from models import User
# Local imports
from config import app, db, api
import ipdb
# Add your model imports


# Views go here!

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


api.add_resource(Signup, '/signup')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

