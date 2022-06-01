from .db import db
import datetime


class Variety(db.Model):
  __tablename__ = 'varieties'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(100), nullable=False)
  created_at = db.Column(db.DateTime, default=datetime.datetime.now())
  updated_at = db.Column(db.DateTime, default=datetime.datetime.now(), onupdate=datetime.datetime.now())

  wines = db.relationship('Wine', back_populates='variety')

  def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
        }