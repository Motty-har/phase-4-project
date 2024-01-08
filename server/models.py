from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.hybrid import hybrid_property
from sqlalchemy.ext.associationproxy import association_proxy

from config import db, bcrypt

# Models go here!
class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)

    reviews = db.relationship("Review", back_populates="user")

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

class Coach(db.Model):
    __tablename__ = 'coaches'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String, nullable=False)
    last_name = db.Column(db.String, nullable=False)
    sport = db.Column(db.String,nullable=False)
    rate = db.Column(db.Integer, nullable=False)

    reviews = db.relationship("Review", back_populates="coach")

    def __repr__(self):
        return f'<Coach {self.first_name} {self.last_name}, Sport: {self.sport}, Rate Per Session: {self.rate}'

class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    review = db.Column(db.String, nullable=False)

    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    coach_id = db.Column(db.Integer, db.ForeignKey("coaches.id"))

    user = db.relationship("Customer", back_populates="users")
    coach = db.relationship("Item", back_populates="coaches")

    def __repr__(self):
        return f"<Review {self.id}, {self.review}, {self.user.name}, {self.coach.name}>"

    


