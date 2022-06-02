from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
import datetime


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    profile_image_url = db.Column(db.String(1000), default='https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/209290118-348545419959856-6760331049776615301-n-1635532292.jpeg?crop=1xw:1xh;center,top&resize=480:*')
    bio = db.Column(db.Text)
    birthdate = db.Column(db.Date, nullable=False)
    location = db.Column(db.String(50))
    business = db.Column(db.Boolean, default=False, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.datetime.now(), onupdate=datetime.datetime.now())

    wines = db.relationship('Wine', back_populates='user')
    reviews = db.relationship('Review', back_populates='user', cascade='all, delete')

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        wines = [
            {'name': wine.name, 'year': wine.year, 'id': wine.id, 'color': wine.color, 'image_url': wine.image_url, 'sweetness': wine.sweetness } for wine in self.wines
        ]
        reviews = [
            {'id': review.id, 'user_id': review.user_id, 'wine_id': review.wine_id, 'text': review.text, 'rating': review.rating, 'image_url': review.image_url, 'created_at': review.created_at, 'updated_at': review.updated_at} for review in self.reviews
        ]

        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'profile_image_url': self.profile_image_url,
            'bio': self.bio,
            'location': self.location,
            'wines': wines,
            'reviews': reviews
        }
