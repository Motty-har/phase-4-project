#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker
import random

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
        

        users = []

        for i in range(20):
            user = User(
                username=fake.first_name()
            )
            user.password_hash = user.username + 'password'


            users.append(user)
        
        for user in users:
            db.session.add(user)
        
        db.session.commit()
        
        sports = ['Basketball', 'Soccer', 'Tennis', 'Baseball', 'Swimming', 'Golf', 'Football', 'Volleyball', 'Hockey']
        
        coaches = []
        
        for i in range(20):
            random_sport = random.choice(sports)
            first_name = fake.first_name()
            last_name = fake.last_name()
            coach = Coach(
                
                first_name=first_name,
                last_name=last_name,
                sport=random_sport,
                rate=fake.random_int(min=30, max=100),
                number=fake.phone_number(),
                email=f'{first_name}{last_name}@mail.com'.lower()

            )
            coaches.append(coach)
            
        for coach in coaches:
            db.session.add(coach)

        db.session.commit()

        actual_reviews = [
            "Great communication, easy to understand instructions.",
            "Positive and encouraging coach, built my confidence.",
            "Helpful tips and strategies provided during sessions.",
            "Dedicated coach, focused on individual improvement.",
            "Effective training methods, saw results quickly.",
            "Attentive to details, corrected techniques for better performance.",
            "Excellent motivator, made workouts enjoyable.",
            "Friendly and approachable, created a comfortable learning environment.",
            "Skilled in the sport, shared valuable insights.",
            "Patient instructor, adapted to my learning pace.",
            "Impressed with the level of professionalism.",
            "Structured sessions, covered a variety of skills.",
            "Inspiring coach, passionate about the sport.",
            "Provided constructive feedback for continuous improvement.",
            "Well-organized lessons, covered both basics and advanced techniques.",
            "Great emphasis on fundamentals, improved my fundamentals significantly.",
            "Accessible and accommodating to schedule changes.",
            "Consistently challenged me to push beyond my limits.",
            "Focused on overall fitness, not just sport-specific skills.",
            "Enthusiastic and engaging coaching style.",
        ]
        
        reviews = []
        coaches = [coach.id for coach in Coach.query.all()]
        users = [user.id for user in User.query.all()]
        
        for i in range(40):
            random_coach_id = random.choice(coaches)
            random_user_id = random.choice(users)
            random_review = random.choice(actual_reviews)
            review = Review(review=random_review, user_id=random_user_id, coach_id=random_coach_id)
            reviews.append(review)
        
        for review in reviews:
            db.session.add(review)
        db.session.commit()