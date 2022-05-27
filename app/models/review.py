from .db import db
import datetime


class Review(db.Model):
  __tablename__ = 'reviews'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  wine_id = db.Column(db.Integer, db.ForeignKey('wines.id'), nullable=False)
  text = db.Column(db.Text)
  rating = db.Column(db.Integer, nullable=False)
  image_url = db.Column(db.String(1000))
  created_at = db.Column(db.DateTime, default=datetime.datetime.now())
  updated_at = db.Column(db.DateTime, default=datetime.datetime.now(), onupdate=datetime.datetime.now())

  user = db.relationship('User', back_populates='reviews')
  wine = db.relationship('Wine', back_populates='reviews')

  def to_dict(self):
    return {
        'id': self.id,
        'user_id': self.user_id,
        'wine_id': self.wine_id,
        'text': self.text,
        'rating': self.rating,
        'image_url': self.image_url,
        'created_at': self.created_at,
        'updated_at': self.updated_at,
        'user': self.user.to_dict()
        # 'wine_review': self.wine_review,
    }