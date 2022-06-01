from crypt import methods
from flask import Blueprint, jsonify, session, request
from app.models import Review, db
from app.forms import ReviewForm

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/', methods=["GET"])
def get_all_reviews():
    reviews = Review.query.all()
    return {"reviews": [review.to_dict() for review in reviews]}


@review_routes.route('/<int:id>', methods=["GET"])
def get_one_review(id):
    review = Review.query.get(id)
    return review.to_dict()

@review_routes.route('', methods=["POST"])
def new_review():
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if (form.validate_on_submit):
        review = Review(
            user_id = form.data['user_id'],
            wine_id = form.data['wine_id'],
            text = form.data['text'],
            rating = form.data['rating'],
            image_url = form.data['image_url']
        )
        db.session.add(review)
        db.session.commit()
        return review.to_dict()

@review_routes.route('/<int:id>', methods=["PUT"])
def edit_review(id):
    review = Review.query.get(id)
    new_text = request.json["text"]
    new_url = request.json["image_url"]
    new_rating = request.json["rating"]
    review.text = new_text
    review.image_url = new_url
    review.rating = new_rating
    db.session.commit()

    return review.to_dict()
