from flask import Flask
from flask_restx import Api
from models import Recipe,User
from exts import db
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from recipes import recipe_ns
from auth import auth_ns
from flask_cors import CORS


def create_app(config):
    app = Flask(__name__)
    CORS(app)
    app.config.from_object(config)
    
    db.init_app(app)

    migrate = Migrate(app, db)
    JWTManager(app)

    api = Api(app, doc="/docs")
    
    api.add_namespace(recipe_ns)
    api.add_namespace(auth_ns)

    @app.shell_context_processor
    def make_shell_context():
        return {'db': db, 'Recipe': Recipe,
                "user": User}

    return app


# from flask import Flask
# from flask_restx import Api, Resource
# from config import DevConfig
# from models import Recipe
# from exts import db

# app = Flask(__name__)
# app.config.from_object(DevConfig)
# api = Api(app, doc="/docs")
# db.init_app(app)

# @api.route('/hello')
# class HelloResource(Resource):
#     def get(self):
#         return {"message": "Hello World"}

# @app.shell_context_processor
# def make_shell_context():
#     return {
#         "db": db,
#         "Recipe": Recipe
#     }