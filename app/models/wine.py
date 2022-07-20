from .db import db
import datetime


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
  created_at = db.Column(db.DateTime, default=datetime.datetime.now())
  updated_at = db.Column(db.DateTime, default=datetime.datetime.now(), onupdate=datetime.datetime.now())

  variety = db.relationship('Variety', back_populates='wines')
  user = db.relationship('User', back_populates='wines')
  # reviews = db.relationship('Review', back_populates='wine')
  reviews = db.relationship('Review', back_populates='wine', cascade='all, delete, delete-orphan')

  def to_dict(self):
    return {
      'id': self.id,
      'name': self.name,
      'year': self.year,
      'description': self.description,
      'color': self.color,
      'sweetness': self.sweetness,
      'image_url': self.image_url,
      'user': self.user.to_dict(),
      'created_at': self.created_at,
      'variety_id': self.variety.to_dict()
    }
