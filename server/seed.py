#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Coach, Review

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():
        print("Starting seed...")
        User.query.delete()
        Coach.query.delete()
        Review.query.delete()
        
        user1 = User(
            username=fake.first_name()
        )
        user1.password_hash = user1.username + 'password'

        user2 = User(
            username=fake.first_name()
        )
        user2.password_hash = user2.username + 'password'
        db.session.add_all([user1, user2])
        db.session.commit()

        coach1 = Coach(
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            sport="Basketball",
            rate=45,
            image="https://t3.ftcdn.net/jpg/01/73/89/66/360_F_173896685_3Q3Vv2aCRkm9irKWD1g5BqASx6seST8L.jpg"
        )
        coach2 = Coach(
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            sport="Football",
            rate=50
        )

        coach3 = Coach(
            first_name="Levi",
            last_name="Goodmann",
            sport="Baseball",
            rate=1000

        )
        
        db.session.add_all([coach1, coach2, coach3, coach4, coach5,coach6])
        db.session.commit()

        db.session.add(Review(review="Great coach", user=user2, coach=coach2))
        db.session.add(Review(review="Amazing coach", user=user1, coach=coach1))
        db.session.add(Review(review="Decent coach", user=user1, coach=coach2))
        db.session.add(Review(review="Awesome coach", user=user2, coach=coach1))
        db.session.commit()