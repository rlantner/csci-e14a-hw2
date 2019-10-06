# Write the model data structure

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
	__tablename__ = 'users'
	uid = db.Column(db.Integer, primary_key=True, autoincrement=True)
	username = db.Column(db.String(10), nullable=False)
	first_name = db.Column(db.String(100))
	last_name = db.Column(db.String(100))
	prog_lang = db.Column(db.String(100))
	experience_yr = db.Column(db.Numeric(3,1))
	age = db.Column(db.Integer)
	hw1_hrs = db.Column(db.Numeric(3,1))


# For reference, SQL DDL statement below
# create table users(uid serial primary key, username varchar(10) not null, first_name varchar(100), last_name varchar(100), prog_lang varchar(100), experience_yr numeric(3,1), age int, hw1_hrs numeric(3,1));