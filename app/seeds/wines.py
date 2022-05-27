from app.models import db, Wine


# Adds a demo user, you can add other users here if you want
def seed_wines():
    demo = Wine(
    name="Alpha Estate", year=2004, variety_id=2, description="Phenomenal", color="White", sweetness="Sweer", user_id=1, image_url="https://vinepair.com/wp-content/uploads/2021/11/50-best-wines-2021_internal_wine-50.jpg")

    demo1 = Wine(
    name="The Drawing Board", year=2020, variety_id=6, description="Dark & Robust", color="Red", sweetness="Semi-Sweet", user_id=2, image_url="https://vinepair.com/wp-content/uploads/2021/11/50-best-wines-2021_internal_wine-49.jpg")

    demo2 = Wine(
    name="Frizant", year=2014, variety_id=4, description="Light & Tasty", color="White", sweetness="Bitter", user_id=3, image_url="https://vinepair.com/wp-content/uploads/2021/11/50-best-wines-2021_internal_wine-48.jpg")

    demo3 = Wine(
    name="Secret De Fammille", year=2017, variety_id=1, description="Great Dessert Wine", color="Pink", sweetness="Sweet", user_id=4, image_url="https://vinepair.com/wp-content/uploads/2021/11/50-best-wines-2021_internal_wine-47.jpg")

    demo4 = Wine(
    name="Montelocco", year=2014, variety_id=3, description="Rich in flavor", color="Red", sweetness="Bitter", user_id=5, image_url="https://vinepair.com/wp-content/uploads/2021/11/50-best-wines-2021_internal_wine-46-2.jpg")

    demo5 = Wine(
    name="Kita Spe'y Camp", year=2016, variety_id=7, description="California cherries & nutmeg", color="Red", sweetness="Average", user_id=5, image_url="https://vinepair.com/wp-content/uploads/2021/11/50-best-wines-2021_internal_wine-45.jpg")

    demo6 = Wine(
    name="Vivanterre", year=2020, variety_id=6, description="Funky French Wine", color="White", sweetness="Bitter", user_id=3, image_url="https://vinepair.com/wp-content/uploads/2021/11/50-best-wines-2021_internal_wine-44.jpg")

    demo7 = Wine(
    name="Chapel Down", year=2015, variety_id=2, description="English Sparkling Wine", color="White", sweetness="Sweet", user_id=4, image_url="https://vinepair.com/wp-content/uploads/2021/11/50-best-wines-2021_internal_wine-43-2.jpg")

    demo8 = Wine(
    name="Giant's Step", year=2013, variety_id=1, description="Australian Chardonnay", color="White", sweetness="Semi-Sweet", user_id=2, image_url="https://vinepair.com/wp-content/uploads/2021/11/50-best-wines-2021_internal_wine-40.jpg")

    demo9 = Wine(
    name="Scribe Pinot Noir", year=2018, variety_id=8, description="Unctuous and fruity", color="Red", sweetness="Bitter", user_id=3, image_url="https://vinepair.com/wp-content/uploads/2021/11/50-best-wines-2021_internal_wine-39.jpg")

    db.session.add(demo)
    db.session.add(demo1)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(demo5)
    db.session.add(demo6)
    db.session.add(demo7)
    db.session.add(demo8)
    db.session.add(demo9)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_wines():
    db.session.execute('TRUNCATE wines RESTART IDENTITY CASCADE;')
    db.session.commit()
