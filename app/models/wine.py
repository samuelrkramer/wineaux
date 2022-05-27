from .db import db

class Wine(db.Model):
  __tablename__ = 'wines'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(100), nullable=False)
  year = db.Column(db.Integer)
  variety_id = db.Column(db.Integer, db.ForeignKey('varieties.id'), nullable=False)
  description = db.Column(db.String(1000))
  color = db.Column(db.String(50), nullable=False)
  sweetness = db.Column(db.String(50), nullable=False)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  image_url = db.Column(db.String(1000))

  variety = db.relationship('Variety', back_populates='wines')
  user = db.relationship('User', back_populates='user_wines')
  review = db.relationship('Review', back_populates='wine_review')
