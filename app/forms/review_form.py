from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Review

class ReviewForm(FlaskForm):
    user_id = IntegerField('user_id', validators=[DataRequired()])
    wine_id = IntegerField('wine_id', validators=[DataRequired()])
    text = StringField('text', validators=[DataRequired()])
    rating = IntegerField('rating', validators=[DataRequired()])
    image_url = StringField('image_url', validators=[DataRequired()])