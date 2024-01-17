from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy

from config import db, bcrypt

# Models go here!
class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)

    serialize_rules = ("-reviews.user",)

    reviews = db.relationship("Review", back_populates="user")
    
    user_reviews = association_proxy("reviews", "review")
    
    @hybrid_property
    def password_hash(self):
        raise AttributeError('Password hashes may not be viewed.')

    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))

    def __repr__(self):
        return f'<User {self.username}>'

class Coach(db.Model, SerializerMixin):
    __tablename__ = 'coaches'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    sport = db.Column(db.String,nullable=False)
    rate = db.Column(db.Integer, nullable=False)
    image = db.Column(db.String, default="https://static.vecteezy.com/system/resources/previews/005/228/939/original/avatar-man-face-silhouette-user-sign-person-profile-picture-male-icon-black-color-illustration-flat-style-image-vector.jpg")
    number = db.Column(db.Integer)
    email = db.Column(db.String)

    serialize_rules = ("-reviews.coach",)

    reviews = db.relationship("Review", back_populates="coach")

    coach_reviews = association_proxy("reviews", "review")

    def __repr__(self):
        return f'<Coach {self.first_name} {self.last_name}, Sport: {self.sport}, Rate Per Session: {self.rate}'

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    serialize_rules = ("-user.reviews", "-coach.reviews")

    id = db.Column(db.Integer, primary_key=True)
    review = db.Column(db.String, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    coach_id = db.Column(db.Integer, db.ForeignKey("coaches.id"))

    user = db.relationship("User", back_populates="reviews")
    coach = db.relationship("Coach", back_populates="reviews")

    def __repr__(self):
        return f"<Review {self.id}, {self.review}>"

    


