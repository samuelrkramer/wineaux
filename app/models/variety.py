from .db import db

class Variety(db.Model):
  __tablename__ = 'varieties'

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(100), nullable=False)

  wines = db.relationship('Wine', back_populates='variety')
