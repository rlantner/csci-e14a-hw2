# Define Web Form

from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DecimalField, SubmitField
from wtforms.validators import DataRequired

class UsersForm(FlaskForm):
	  username = StringField('Username', validators=[DataRequired()])
	  first_name = StringField('First Name')
	  last_name = StringField('Last Name')
	  prog_lang = StringField('Programming Language')
	  experience_yr = DecimalField('Years of Programming Experience')
	  age = IntegerField('Age')
	  hw1_hrs = DecimalField('Hours Spent on HW1')
	  submit = SubmitField('Enter')