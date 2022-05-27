from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Review

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/', methods=["GET"])
def get_all_reviews():
    reviews = Review.query.all()
    