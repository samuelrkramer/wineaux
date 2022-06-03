from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField, TextAreaField
from wtforms.validators import DataRequired, ValidationError
# from app.models import Wine

def name_length(form, field):
    name = field.data
    if len(name) > 100 or len(name) < 2:
        raise ValidationError('Wine name must be between 2 and 100 characters.')

class WineForm(FlaskForm):
    # wine_id = IntegerField('wine_id', validators=[DataRequired()])
    name = StringField('name', validators=[DataRequired(), name_length])
    year = IntegerField('year')
    variety_id = SelectField('variety_id', validators=[DataRequired()])
    description = TextAreaField('description')
    color = SelectField('color', validators=[DataRequired()],
        choices=[
            ('Gray'),
            ('Orange'),
            ('Red'),
            ('Rosé'),
            ('Tawny'),
            ('White'),
            ('Yellow'),
        ])
    sweetness = StringField('sweetness', validators=[DataRequired()])
    user_id = IntegerField('user_id', validators=[DataRequired()])
    image_url = StringField('image_url')