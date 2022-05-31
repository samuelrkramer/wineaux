from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    tom = User(
        username='Tomollier', email='tom@info.io', password='password', first_name='Thomas', last_name='Haverford', profile_image_url='https://www.brightcellars.com/blog/wp-content/uploads/2020/08/red-and-white-wine--1000x600.jpg', bio='Organic. Biodynamic. Natural. What does it all mean? As the wine world marches toward eco-consciousness and sustainability, consumers are left with more buzzwords, and more questions.', birthdate='10-21-90', location='New York', business=False)
    tina = User(
        username='TinaRose', email='tina@info.io', password='password', first_name='Tina', last_name='Gingham', profile_image_url='https://253qv1sx4ey389p9wtpp9sj0-wpengine.netdna-ssl.com/wp-content/uploads/2019/09/Eliza_Frey-in-organic-vineyards-Credit_Nathaniel_Frey_1920x1280.jpg', bio='Can a natural wine be certified organic? If the grape growing adheres to organic standards, then yes. Can they also be biodynamic? So long as the winemaker employs the biodynamic requirements like the calendar and composting, they can be that, too. Because its more rigorous to have a wine labeled organic than natural, many winemakers prefer to skip this regulatory distinction altogether.', birthdate='09-13-76', location='Delaware', business=False)
    greg = User(
        username='FineWine', email='greg@info.io', password='password', first_name='Greg', last_name='Tinsletown', profile_image_url='https://vinepair.com/wp-content/uploads/2015/11/heart-healthy.jpg', bio='The concept behind biodynamics is that everything in the universe is interconnected and gives off a resonance or vibe. The interconnectivity of everything even includes celestial bodies like the moon, planets and stars. Biodynamic viticulture is the practice of balancing this resonance between vine, man, earth and stars. Essentially, biodynamics is a holistic view of agriculture.', birthdate='07-28-55', location='Washington', business=False)
    shannon = User(
        username='TannenShannon', email='shannon@info.io', password='password', first_name='Shannon', last_name='Wilson', profile_image_url='https://p2d7x8x2.stackpathcdn.com/content/uploads/2015/04/women-drinking-wine-350x350.jpg', bio='First impressions are still important in the 21st century, but they look a little different. Professional biographies (or "professional bios" for short) are short blurbs to get your name, accomplishments, and employment history in front of the right people.', birthdate='01-04-84', location='Texas', business=False)
    logan = User(
        username='GrapeStomper55', email='logan@info.io', password='password', first_name='Logan', last_name='Olson', profile_image_url='https://www.denverpost.com/wp-content/uploads/2021/06/The_best_Colorado_restaurants_for_wine_drinkers_according_to_Wine_Spectator_1.jpg', bio='The concept of Biodynamics started in the 1920s with an Austrian philosopher named Rudolph Steiner. It is a holistic, homeopathic manner of farming that, of course, also includes viticulture. It is the oldest, anti-chemical agricultural movement that predates the creation of organic farming by about twenty years.', birthdate='12-12-89', location='Montana', business=False)
    sherry = User(
        username='VerySherry', email='sherry@info.io', password='password', first_name='Sherry', last_name='Harkness', profile_image_url='https://img.washingtonpost.com/rf/image_1484w/2010-2019/WashingtonPost/2016/09/09/Food/Images/Jancis_Udemy_profile_pic-4.jpg?uuid=h_zUWHazEeaBSbjQUyHbYg', bio='You can find biodynamic wines in United States, France, Germany, Spain, Italy, Eastern Europe, Chile, Argentina, India and Australia. Those who believe in the philosophy think that the wines are more characteristic to the terroir where they originate. The wines are often described as balanced and age equally as long as standard wines.', birthdate='10-21-90', location='New York', business=False)


    db.session.add(tom)
    db.session.commit()

    db.session.add(tina)
    db.session.add(greg)
    db.session.add(shannon)
    db.session.add(logan)
    db.session.add(sherry)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
