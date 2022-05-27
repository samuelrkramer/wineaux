from app.models import db, Review


# Adds a bunch of fake reviews, you can add other reviews here if you want
def seed_reviews():
    r1 = Review(
        user_id=2, wine_id=1, text='The wine is fruity and I am adequately drunk.', rating=5)
    r2 = Review(
        user_id=4, wine_id=2, text='Beautiful notes of grapes.', rating=4)
    r3 = Review(
        user_id=6, wine_id=3, text='This is wine', rating=3)
    r4 = Review(
        user_id=1, wine_id=3, text='I\'m pretty sure this is grape juice', rating=2)
    r5 = Review(
        user_id=3, wine_id=3, text='I think this might be acetone', rating=1)
    r6 = Review(
        user_id=5, wine_id=6, text='This is the best wine I\'ve ever tasted, C-', rating=2)
    r7 = Review(
        user_id=5, wine_id=7, text='I can\'t read', rating=4)
    r8 = Review(
        user_id=5, wine_id=7, text='Woo rating this a second time! Now it\'s a 2', rating=2)
    r9 = Review(
        user_id=2, wine_id=8, text='I thought this was untappd, sorry', rating=5)
    r10 = Review(
        user_id=4, wine_id=8, text='Lol it made my tongue red', rating=4)

    db.session.add(r1)
    db.session.add(r2)
    db.session.add(r3)
    db.session.add(r4)
    db.session.add(r5)
    db.session.add(r6)
    db.session.add(r7)
    db.session.add(r8)
    db.session.add(r9)
    db.session.add(r10)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the reviews table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_reviews():
    db.session.execute('TRUNCATE rewviews RESTART IDENTITY CASCADE;')
    db.session.commit()
