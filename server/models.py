from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

# Models go here!
class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True, nullable=False)
    _password_hash = db.Column(db.String)

class Coach(db.Model):
    __tablename__ = 'coaches'

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column()
    last_name = db.Column()
    sport = db.Column()
