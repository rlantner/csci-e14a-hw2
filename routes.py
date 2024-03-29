from flask import Flask, render_template, request, redirect, url_for, jsonify
from models import db, User
from forms import UsersForm
from flask_heroku import Heroku

app = Flask(__name__)
# heroku = Heroku(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://localhost/homework_users'
db.init_app(app)

app.secret_key = "e14a-key"

@app.route("/")

@app.route('/index')
def index():
	users = User.query.all()
	return render_template('index.html', title='Home', users=users)

@app.route('/load_data', methods=['GET'])
def load_data():
	users_json = {'users': []}
	users = User.query.all()
	for user in users:
		user_info = user.__dict__
		del user_info['_sa_instance_state']
		users_json['users'].append(user_info)
	return jsonify(users_json)

@app.route('/add-user', methods=['GET', 'POST'])
def add_user():
	form = UsersForm()
	if request.method == 'GET':
		return render_template('add_user.html', form=form)
	else:
		if form.validate_on_submit():
			username = request.form['username']
			first_name = request.form['first_name']
			last_name = request.form['last_name']
			prog_lang = request.form['prog_lang']
			experience_yr = request.form['experience_yr']
			age = request.form['age']
			hw1_hrs = request.form['hw1_hrs']
			new_user = User(username=username, first_name=first_name, last_name=last_name, prog_lang=prog_lang, experience_yr=experience_yr, age=age, hw1_hrs=hw1_hrs)
			db.session.add(new_user)
			db.session.commit()
			return redirect(url_for('index'))

if __name__ == "__main__":
    app.run(debug=True)

