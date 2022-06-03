from crypt import methods
from flask import Blueprint, jsonify, session, request
from flask_login import current_user
from app.models import Wine, Variety, db
from app.forms.wine_form import WineForm

wine_routes = Blueprint('wines', __name__)

@wine_routes.route('/', methods=["GET"])
def get_all_wines():
    wines = Wine.query.all()
    return {"wines": [wine.to_dict() for wine in wines]}

@wine_routes.route('/varieties', methods=["GET"])
def get_all_varieties():
    varieties = Variety.query.all()
    return {"varieties": [variety.to_dict() for variety in varieties]}

@wine_routes.route('/<int:id>', methods=["GET"])
def get_one_wine(id):
    wine = Wine.query.get(id)
    return wine.to_dict()

@wine_routes.route('', methods=["POST"])
def new_wine():
    form = WineForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if (form.validate_on_submit):
        wine = Wine(
            # wine_id = form.data['wine_id'],
            name = form.data['name'],
            year = form.data['year'],
            variety_id = form.data['variety_id'],
            description = form.data['description'],
            color = form.data['color'],
            sweetness = form.data['sweetness'],
            # user_id = form.data['user_id'],
            user_id = current_user.id,
            image_url = form.data['image_url']
        )
        db.session.add(wine)
        db.session.commit()
        print("###################")
        print("wine to dict", wine.to_dict())
        return wine.to_dict()

@wine_routes.route('/<int:id>', methods=["PUT"])
def edit_wine(id):
    print("###############################")
    print("wine put route fired")
    wine = Wine.query.get(id)
    print("got old wine:", wine.to_dict())
    print("json request:", request.json)
    wine.name = request.json["name"]
    wine.year = request.json["year"]
    wine.variety_id = request.json["variety_id"]
    wine.description = request.json["description"]
    wine.color = request.json["color"]
    wine.sweetness = request.json["sweetness"]
    wine.image_url = request.json["image_url"]
    print("so now wine is this:", wine.to_dict())
    db.session.commit()
    print("just commited to db")
    return wine.to_dict() or {'errors': 'invalid wine'}

@wine_routes.route('/<int:id>', methods=["DELETE"])
def delete_one_wine(id):
    wine = Wine.query.get(id)
    db.session.delete(wine)
    db.session.commit()
    return jsonify(deleted=True)