# Wineaux

Wineaux is an app that takes inspiration from [untappd](https://untappd.com/) for users to share their impressions of various wines and browse the reviews of other users.

<h5 align= "center" dir="auto">
   <a href="https://wineauxapp.herokuapp.com/">Visit the live site</a>
   </br>
   <a href="https://github.com/samuelrkramer/wineaux/wiki">Check out the wiki</a>
   </br>
  Created By:
      <a href="https://github.com/da5idf">David Forster</a>
      ,
      <a href="https://github.com/samuelrkramer">Sam Kramer</a>
      ,
      <a href="https://github.com/jonathontufts">Jonathon Tufts</a>
      ,
      <a href="https://github.com/halquist">Jon Halquist</a>
   </br>
   </br>
</h5>

# Technologies Used

<img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' height='40'/><img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg' height='40'/><img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlalchemy/sqlalchemy-original.svg' height='40'/><img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg' height='40'/><img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' height='40'/><img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' height='40'/><img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' height='40'/><img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' height='40'/><img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' height='40'/><img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' height='40'/><img src='https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-plain-wordmark.svg' height='60'/>

# Welcome to Wineaux
## Share, Discover, & Review New Wines !
<img width="1263" alt="Screen Shot 2022-06-03 at 4 36 16 PM" src="https://user-images.githubusercontent.com/86862338/171949468-9952c1b7-ea59-4472-96ee-016b5a75377c.png">

## View Wine Profiles
### Get detailed information & a list of reviews on any wine you find here on Wineaux !
<img width="1264" alt="Screen Shot 2022-06-03 at 4 37 06 PM" src="https://user-images.githubusercontent.com/86862338/171949601-e04d6741-a1bf-4900-992d-e7f2defad075.png">

## Leave Reviews on Wines
### Leave a custom detailed review on any wine. You can also include an image !
<img width="1263" alt="Screen Shot 2022-06-03 at 4 37 38 PM" src="https://user-images.githubusercontent.com/86862338/171949943-49738f0e-f91b-4d93-a137-e88aed6f59c4.png">


## Custom Profile Pages
### Customize your profile & share your reviews / discoveries !
<img width="1264" alt="Screen Shot 2022-06-03 at 4 38 01 PM" src="https://user-images.githubusercontent.com/86862338/171949818-45494342-96cf-4b51-97ec-2f73065c876f.png">

## About us
### Get to know the developers who helped make Wineaux come to life !
<img width="1263" alt="Screen Shot 2022-06-03 at 4 38 29 PM" src="https://user-images.githubusercontent.com/86862338/171950057-23b67b51-1b77-465f-990b-cb43608de318.png">


## Getting started
1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/samuelrkramer/wineaux.git
   ```

2. Install dependencies

      ```bash
      pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

***
*IMPORTANT!*
   psycopg2-binary MUST remain a dev dependency because you can't install it on alpine-linux.
   There is a layer in the Dockerfile that will install psycopg2 (not binary) for us.
***

### Dev Containers (OPTIONAL for M1 Users)
The following instructions detail an *optional* development setup for M1 Mac users having issues with the `psycopg` package.

1. Make sure you have the [Microsoft Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension installed.
2. Make sure you have [Docker](https://www.docker.com/products/docker-desktop/) installed on your computer.
3. Clone the repository (only this branch)
   ```bash
   git clone https://github.com/appacademy-starters/python-project-starter.git
   ```
4. Open the repo in VS Code.
5. Click "Open in Container" when VS Code prompts to open container in the bottom right hand corner.
6. **Be Patient!** The initial install will take a LONG time, it's building a container that has postgres preconfigured and even installing all your project dependencies. (For both flask and react!)

   **Note:** This will take much less time on future starts because everything will be cached.

7. Once everything is up, be sure to make a `.env` file based on `.env.example` in both the root directory and the *react-app* directory before running your app. You do not need a `DATABASE_URL` in the `.env` file if you are using this Docker setup for development - the URL is already set in the image (see `.devcontainer/Dockerfile` for the URL).

8. Get into your pipenv, migrate your database, seed your database, and run your flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

9. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

<br>

## Deploy to Heroku
This repo comes configured with Github Actions. When you push to your main branch, Github will automatically pull your code, package and push it to Heroku, and then release the new image and run db migrations.

1. Write your Dockerfile. In order for the Github action to work effectively, it must have a configured Dockerfile. Follow the comments found in this [Dockerfile](./Dockerfile) to write your own!

2. Create a new project on Heroku.

3. Under Resources click "Find more add-ons" and add the add on called "Heroku Postgres".

4. Configure production environment variables. In your Heroku app settings -> config variables you should have two environment variables set:

   |    Key          |    Value    |
   | -------------   | ----------- |
   | `DATABASE_URL`  | Autogenerated when adding postgres to Heroku app |
   | `SECRET_KEY`    | Random string full of entropy |

5. Generate a Heroku OAuth token for your Github Action. To do so, log in to Heroku via your command line with `heroku login`. Once you are logged in, run `heroku authorizations:create`. Copy the GUID value for the Token key.

6. In your Github Actions Secrets you should have two environment variables set. You can set these variables via your Github repository settings -> secrets -> actions. Click "New respository secret" to create
each of the following variables:

   |    Key            |    Value    |
   | -------------     | ----------- |
   | `HEROKU_API_KEY`  | Heroku Oauth Token (from step 6)|
   | `HEROKU_APP_NAME` | Heroku app name    |

7. Push to your `main` branch! This will trigger the Github Action to build your Docker image and deploy your application to the Heroku container registry. Please note that the Github Action will automatically upgrade your production database with `flask db upgrade`. However, it will *not* automatically seed your database. You must manually seed your production database if/when you so choose (see step 8).

8. *Attention!* Please run this command *only if you wish to seed your production database*: `heroku run -a HEROKU_APP_NAME flask seed all`
