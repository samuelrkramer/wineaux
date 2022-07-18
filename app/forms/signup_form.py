from flask_wtf import FlaskForm
from wtforms import StringField, DateField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User
import datetime
import re


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def valid_email(form, field):
    regex = re.compile(r'([A-Za-z0-9]+[.-_])*[A-Za-z0-9]+@[A-Za-z0-9-]+(\.[A-Z|a-z]{2,})+')
    if not re.fullmatch(regex, field.data):
        raise ValidationError('Must be a valid email.')
    else:
        pass


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def validate_password(form, field):
    confirm_pass = form.data["confirm_pass"]
    if not field.data == confirm_pass:
        raise ValidationError('Passwords do not match.')


def validate_birthday(form, field):

    today = datetime.date.today()
    delta = datetime.timedelta(days=7670)
    ofAge = today - delta
    year = field.data.year
    if year < 1910:
        raise ValidationError(f"Were you really born in {year}?")
    if field.data > ofAge:
        raise ValidationError('Must be 21 years of age.')

class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(), user_exists, valid_email])
    password = StringField('password', validators=[DataRequired(), validate_password])
    confirm_pass = StringField('password', validators=[DataRequired()])
    first_name = StringField('first_name', validators=[DataRequired()])
    last_name = StringField('last_name', validators=[DataRequired()])
    birthdate = DateField('birthdate', validators=[DataRequired(), validate_birthday])
    location = StringField('location')
