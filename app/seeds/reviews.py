from app.models import db, Review


# Adds a bunch of fake reviews, you can add other reviews here if you want
def seed_reviews():
    r1 = Review(
        user_id=2, wine_id=1, text='The wine is fruity and I am adequately drunk.', rating=5)
    r2 = Review(
        user_id=4, wine_id=2, text='Beautiful notes of grapes.', rating=4)
    r3 = Review(
        user_id=6, wine_id=3, text='This is wine', rating=3,
        image_url="https://s3-media0.fl.yelpcdn.com/bphoto/qVTpJE3wRVYbtXfEEUZGiA/o.jpg")
    r4 = Review(
        user_id=1, wine_id=3, text='I\'m pretty sure this is grape juice', rating=2)
    r5 = Review(
        user_id=3, wine_id=3, text='I think this might be acetone', rating=1)
    r6 = Review(
        user_id=5, wine_id=6, text='This is the best wine I\'ve ever tasted, C-', rating=2)
    r7 = Review(
        user_id=5, wine_id=7, text='I can\'t read', rating=4,
        image_url="https://s3-media0.fl.yelpcdn.com/bphoto/lYKn8iFt6io45Ef4Eh71ew/o.jpg")
    r8 = Review(
        user_id=5, wine_id=7, text='Woo rating this a second time! Now it\'s a 2', rating=2)
    r9 = Review(
        user_id=2, wine_id=8, text='I thought this was untappd, sorry', rating=5,
        image_url="https://scontent-lga3-1.cdninstagram.com/v/t51.2885-15/279768221_517465730087627_3690416398824518452_n.jpg?stp=dst-jpg_e35_s320x320&_nc_ht=scontent-lga3-1.cdninstagram.com&_nc_cat=111&_nc_ohc=MjwJOp8yVAoAX-IlcGh&tn=j2SyFnWpBkVToeA0&edm=AFH1aioBAAAA&ccb=7-5&ig_cache_key=MjgzMDcwNDY2NTM1Nzk4NDY1NQ%3D%3D.2-ccb7-5&oh=00_AT9PQevcR2KrdvOzKLXcd4uJ-Hw10ZIIyDoP8sdBXVJvVw&oe=629343D5&_nc_sid=227b6c")
    r10 = Review(
        user_id=4, wine_id=8, text='Lol it made my tongue red', rating=4)
    r11 = Review(
        user_id=6, wine_id=9, rating=4,
        image_url="https://s3-media0.fl.yelpcdn.com/bphoto/hCk5F5s3OmcQfYUWu81MIQ/o.jpg")
    r12 = Review(
        user_id=1, wine_id=10, rating=1)

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
    db.session.add(r11)
    db.session.add(r12)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the reviews table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
