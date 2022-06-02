from flask import Blueprint, request
from flask_login import login_required
from app.models import User, Wine, db



user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


@user_routes.route('/profile/<int:id>')
def userProfile(id):
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/profile/bio/<int:id>', methods=['PUT'])
def edit_bio(id):
    user = User.query.get(id)
    new_bio = request.json['bio']
    user.bio = new_bio
    db.session.commit()

    return user.to_dict()

@user_routes.route('/profile/pic/<int:id>', methods=['PUT'])
def edit_pic(id):
    user = User.query.get(id)
    new_pic = request.json['profile_image_url']
    user.profile_image_url = new_pic
    db.session.commit()

    return user.to_dict()
