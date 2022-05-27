from .db import db

class Review(db.Model):
  __tablename__ = 'reviews'

  id = db.Column(db.Integer, primary_key=True)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  wine_id = db.Column(db.Integer, db.ForeignKey('wines.id'), nullable=False)
  text = db.Column(db.Text)
  rating = db.Column(db.Integer, nullable=False)
  image_url = db.Column(db.String(1000))

  user_review = db.relationship('User', back_populates='review')
  wine_review = db.relationship('Wine', back_populates='review')
