from app.models import db, Variety

def seed_varieties():
    cab_franc = Variety(name="Cabernet Franc")
    cab_sauvignon = Variety(name="Cabernet Sauvignon")
    chardonnay = Variety(name="Chardonnay")
    grenache = Variety(name="Grenache")
    malbec = Variety(name="Malbec")
    merlot = Variety(name="Merlot")
    nebbiolo = Variety(name="Nebbiolo")
    pinotage = Variety(name="Pinotage")
    pinot_gris = Variety(name="Pinot Gris")
    pinot_noir = Variety(name="Pinot Noir")
    riesling = Variety(name="Riesling")
    sauvignon_blanc = Variety(name="Sauvignon Blanc")
    semillon = Variety(name="Semillon")
    syrah = Variety(name="Syrah")
    tempranillo = Variety(name="Tempranillo")
    viognier = Variety(name="Viognier")
    zinfandel = Variety(name="Zinfandel")

    db.session.add(cab_franc)
    db.session.add(cab_sauvignon)
    db.session.add(chardonnay)
    db.session.add(grenache)
    db.session.add(malbec)
    db.session.add(merlot)
    db.session.add(nebbiolo)
    db.session.add(pinotage)
    db.session.add(pinot_gris)
    db.session.add(pinot_noir)
    db.session.add(riesling)
    db.session.add(sauvignon_blanc)
    db.session.add(semillon)
    db.session.add(syrah)
    db.session.add(tempranillo)
    db.session.add(viognier)
    db.session.add(zinfandel)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_varieties():
    db.session.execute('TRUNCATE varieties RESTART IDENTITY CASCADE;')
    db.session.commit()