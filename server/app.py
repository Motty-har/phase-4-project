
from flask import request, session
from flask_restful import Resource
from models import User, Coach, Review
import ipdb

from config import app, db, api
from models import User, Coach, Review

@app.before_request
def check_if_logged_in():
    open_access_list = [
        'signup',
        'login',
        'check_session'
    ]

    if (request.endpoint) not in open_access_list and (not session.get('user_id')):
        return {'error': '401 Unauthorized'}, 401

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
        
        session['user_id'] = user.id

        return user.to_dict(), 200

class CheckSession(Resource):

    def get(self):
        
        user_id = session['user_id']
        
        if user_id:
            user = User.query.filter(User.id == user_id).first()
            return user.to_dict(), 200
        
        return {}, 401
    
class Login(Resource):
     def post(self):

        request_json = request.get_json()

        username = request_json.get('username')
        password = request_json.get('password')

        user = User.query.filter(User.username == username).first()
        if user:
            if user.authenticate(password):
                
                session['user_id'] = user.id

                return user.to_dict(), 200

        return {'error': '401 Unauthorized'}, 401

class Logout(Resource):
     def delete(self):

        session['user_id'] = None
        
        return {}, 204
     
class Coaches(Resource):

    def get(self):
        coaches = Coach.query.all()
        return [coach.to_dict() for coach in coaches]

class Reviews(Resource):
    
    def get(self, id):
        reviews = Review.query.filter(Review.coach_id == 1).all()

        if reviews:
            return [review.to_dict() for review in reviews], 200
        return {}, 400

class AddReview(Resource):
    def post(self):
        request_json = request.get_json()

        coach_id = request_json.get("coach_id")
        user_id = request_json.get("user_id")  
        review = request_json.get("review")

        review_obj = Review(
            coach_id=coach_id,
            user_id=user_id,
            review=review
        )
        
        db.session.add(review_obj)
        db.session.commit()

        return review_obj.to_dict(), 200


api.add_resource(Signup, '/signup')
api.add_resource(CheckSession, '/check_session')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(Coaches, '/coaches')
api.add_resource(Reviews, '/reviews/<int:id>')
api.add_resource(AddReview, '/add_review')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

