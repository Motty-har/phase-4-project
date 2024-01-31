
from flask import request, session, render_template
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
        user_id = session.get('user_id')
        
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
        
        return False, 204
     
class Coaches(Resource):

    def get(self):
        coaches = Coach.query.all()
        return [coach.to_dict() for coach in coaches]

class CoachResource(Resource):
    
    def get(self, id):
        coach = Coach.query.filter(Coach.id == id).first()

        if coach:
            return coach.to_dict(), 200
        return {}, 400

class AddReview(Resource):
    def post(self):
        request_json = request.get_json()
        
        coach_id = request_json.get("coach_id")
        user_id = request_json.get("user_id")  
        review = request_json.get("review")

        new_review = Review(
            coach_id=coach_id,
            user_id=user_id,
            review=review
        )
        
        db.session.add(new_review)
        db.session.commit()
        
        coach = Coach.query.filter_by(id = coach_id).first().to_dict()
        

        return coach, 200

class DeleteReview(Resource):
    def delete(self, id):
        review = Review.query.filter(Review.id == id).first()
        if review:
            db.session.delete(review)
            db.session.commit()
            return {'message': 'Review deleted successfully'}, 200
        else:
            return {'error': 'Review not found'}, 404
        
class UpdateReview(Resource):
    def patch(self, id):
        request_json = request.get_json()
        review = Review.query.filter(Review.id == id).first()
        review.review = request_json.get('review')

        db.session.commit()
        
        return review.to_dict(), 200




api.add_resource(Signup, '/signup')
api.add_resource(CheckSession, '/check_session')
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')
api.add_resource(Coaches, '/coaches')
api.add_resource(CoachResource, '/coach/<int:id>')
api.add_resource(AddReview, '/add_review')
api.add_resource(DeleteReview, '/delete_review/<int:id>')
api.add_resource(UpdateReview, '/update_review/<int:id>')

@app.route('/')
@app.route('/<int:id>')
def index(id=0):
    return render_template("index.html")

if __name__ == '__main__':
    app.run(port=5555, debug=True)

