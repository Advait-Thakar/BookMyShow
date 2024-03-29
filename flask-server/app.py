import datetime
from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:''@localhost/BookMyShow'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Movies(db.Model):
    movie_id = db.Column(db.Integer, primary_key=True)
    movie_name = db.Column(db.String(100), nullable=False)
 
class Theatres(db.Model):
    theatre_id = db.Column(db.Integer, primary_key=True)
    theatre_name = db.Column(db.String(100), nullable=False)

class MoviesShowTimings(db.Model):
    movie_id = db.Column(db.Integer, db.ForeignKey('movies.movie_id'), primary_key=True)
    theatre_id = db.Column(db.Integer, db.ForeignKey('theatres.theatre_id'), primary_key=True)
    date = db.Column(db.Date, primary_key=True)
    time_slots = db.Column(db.JSON)

# @app.route('/movie-show-timings/<int:movie_id>')
# def get_movie_show_timings(movie_id):
#     movie_show_timings = MoviesShowTimings.query.filter_by(movie_id=movie_id).all()
#     timings_data = []
#     for show_timing in movie_show_timings:
#         timings_info = {
#             'theater_id': show_timing.theatre_id,
#             'date': show_timing.date.strftime('%Y-%m-%d'),
#             'time_slots': show_timing.time_slots
#         }
#         timings_data.append(timings_info)
#     return jsonify(timings_data)

# @app.route('/movie-show-timings/date/<date>/movie/<int:movie_id>')
# def get_movie_show_timings_by_date(date, movie_id):
#     try:
#         movie_date = datetime.datetime.strptime(date, '%Y-%m-%d').date()
#     except ValueError:
#         return jsonify({'error': 'Invalid date format. Please provide date in YYYY-MM-DD format.'}), 400

#     movie_show_timings = MoviesShowTimings.query.filter_by(date=movie_date, movie_id=movie_id).all()
#     timings_data = []
#     for show_timing in movie_show_timings:
#         timings_info = {
#             'theater_id': show_timing.theatre_id,
#             'date': show_timing.date.strftime('%Y-%m-%d'),
#             'time_slots': show_timing.time_slots
#         }
#         timings_data.append(timings_info)
#     return jsonify(timings_data)

# if __name__ == '__main__':
#     app.run(debug=True)

@app.route('/movie-show-timings/movie/<string:movie_name>/date/<date>')
def get_movie_show_timings_by_date(movie_name, date):
    try:
        movie_date = datetime.datetime.strptime(date, '%Y-%m-%d').date()
    except ValueError:
        return jsonify({'error': 'Invalid date format. Please provide date in YYYY-MM-DD format.'}), 400

    # Query the Movies table to find the movie_id based on the movie_name
    movie = Movies.query.filter_by(movie_name=movie_name).first()
    if not movie:
        return jsonify({'error': f'Movie with name {movie_name} not found.'}), 404

    # Perform a join operation between MoviesShowTimings, Movies, and Theatres tables
    movie_show_timings = db.session.query(MoviesShowTimings, Movies, Theatres) \
        .join(Movies, MoviesShowTimings.movie_id == Movies.movie_id) \
        .join(Theatres, MoviesShowTimings.theatre_id == Theatres.theatre_id) \
        .filter(MoviesShowTimings.date == movie_date, Movies.movie_name == movie_name) \
        .all()

    timings_data = []
    for show_timing, movie, theatre in movie_show_timings:
        timings_info = {
            'theatre_name': theatre.theatre_name,
            'date': show_timing.date.strftime('%Y-%m-%d'),
            'time_slots': show_timing.time_slots
        }
        timings_data.append(timings_info)

    return jsonify(timings_data)

if __name__ == '__main__':
    app.run(debug=True)

