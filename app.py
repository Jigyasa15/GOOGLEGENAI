# from flask import Flask, render_template, request, redirect, url_for, session, flash
# from flask_mail import Mail, Message
# import random
# from authlib.integrations.flask_client import OAuth

# app = Flask(__name__)  # Corrected here
# app.secret_key = 'random_secret_key'

# # Configure Flask-Mail
# app.config['MAIL_SERVER'] = 'smtp.gmail.com'
# app.config['MAIL_PORT'] = 587
# app.config['MAIL_USE_TLS'] = True
# app.config['MAIL_USERNAME'] = 'abhisheksauray34@gmail.com'  # Your email
# app.config['MAIL_PASSWORD'] = 'xbtc qgoo ipnu ddmd'   # Your email password
# app.config['MAIL_DEFAULT_SENDER'] = 'abhisheksauray34@gmail.com'
# mail = Mail(app)

# # Configure OAuth
# oauth = OAuth(app)
# google = oauth.register(
#     name='google',
#     client_id='154232292325-gke4qtojhrffani8dn3bbagvq88ma1ps.apps.googleusercontent.com',
#     client_secret='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',
#     access_token_url='https://oauth2.googleapis.com/token',  # Use the correct URL
#     access_token_params=None,
#     authorize_url='https://accounts.google.com/o/oauth2/auth',
#     authorize_params=None,
#     userinfo_endpoint='https://openidconnect.googleapis.com/v1/userinfo',  # Updated endpoint
#     client_kwargs={'scope': 'openid profile email'},
# )

# # Home Route
# @app.route('/')
# def index():
#     return render_template('index.html')

# # Sign-In Route
# @app.route('/signin')
# def signin():
#     return render_template('signin.html')

# # Google Login Route
# @app.route('/login/google')
# def google_login():
#     redirect_uri = url_for('google_authorize', _external=True)
#     return google.authorize_redirect(redirect_uri)

# # Google OAuth Callback Route
# @app.route('/authorize/google')
# def google_authorize():
#     token = google.authorize_access_token()
#     user_info = google.get('userinfo').json()
    
#     # Save user info in session
#     session['profile'] = user_info
#     return redirect(url_for('dashboard'))

# # Dashboard Route
# @app.route('/dashboard')
# def dashboard():
#     user_info = session.get('profile', None)
#     if user_info:
#         return f"Welcome, {user_info['email']}! You are logged in."
#     else:
#         return redirect(url_for('signin'))

# # Send OTP Email
# @app.route('/send_otp', methods=['POST'])
# def send_otp():
#     email = request.form['email']
    
#     # Generate a random OTP
#     otp = random.randint(100000, 999999)
    
#     # Store OTP in session temporarily
#     session['otp'] = otp
#     session['email'] = email
    
#     # Send OTP to the user's email
#     msg = Message('Your OTP Code', recipients=[email])
#     msg.body = f'Your OTP code is {otp}'
#     mail.send(msg)
    
#     return render_template('verify_otp.html', email=email)

# # Verify OTP
# @app.route('/verify_otp', methods=['POST'])
# def verify_otp():
#     otp_input = request.form['otp']
    
#     if session.get('otp') == int(otp_input):
#         return redirect(url_for('dashboard'))
#     else:
#         flash("Invalid OTP. Please try again.")
#         return redirect(url_for('signin'))

# if __name__ == '__main__':  # Corrected here
#     app.run(debug=True,port=5001)

from flask import Flask, render_template, request, redirect, url_for, session, flash
from flask_mail import Mail, Message
from datetime import datetime, timedelta
import random
from authlib.integrations.flask_client import OAuth

app = Flask(__name__)  # Corrected here
app.secret_key = 'random_secret_key'

# Configure Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'abhisheksauray34@gmail.com'  # Your email
app.config['MAIL_PASSWORD'] = 'xbtc qgoo ipnu ddmd'   # Your email password
app.config['MAIL_DEFAULT_SENDER'] = 'abhisheksauray34@gmail.com'
mail = Mail(app)

# Configure OAuth
oauth = OAuth(app)
google = oauth.register(
    name='google',
    client_id='154232292325-gke4qtojhrffani8dn3bbagvq88ma1ps.apps.googleusercontent.com',
    client_secret='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',
    access_token_url='https://oauth2.googleapis.com/token',  # Use the correct URL
    access_token_params=None,
    authorize_url='https://accounts.google.com/o/oauth2/auth',
    authorize_params=None,
    userinfo_endpoint='https://openidconnect.googleapis.com/v1/userinfo',  # Updated endpoint
    client_kwargs={'scope': 'openid profile email'},
)

# Home Route
@app.route('/')
def index():
    return render_template('index.html')

# Sign-In Route
@app.route('/signin')
def signin():
    return render_template('signin.html')

# Google Login Route
@app.route('/login/google')
def google_login():
    redirect_uri = url_for('google_authorize', _external=True)
    return google.authorize_redirect(redirect_uri)

# Google OAuth Callback Route
@app.route('/authorize/google')
def google_authorize():
    token = google.authorize_access_token()
    user_info = google.get('userinfo').json()
    
    # Save user info in session
    session['profile'] = user_info
    return redirect(url_for('dashboard'))

# Dashboard Route
@app.route('/dashboard')
def dashboard():
     # Check if the OTP is verified
    if 'otp_verified' not in session or not session['otp_verified']:
        flash("You need to verify your OTP first.")
        return redirect(url_for('signin'))
    
    return render_template('dashboard.html') # Render your dashboard template here

# Send OTP Email
@app.route('/send_otp', methods=['POST'])
def send_otp():
    email = request.form['email']

    # Generate a random OTP
    otp = random.randint(100000, 999999)
    
    # Get the current time (UTC) and set an expiration time (e.g., 5 minutes)
    now = datetime.utcnow()
    otp_expiry = now + timedelta(minutes=5)  # OTP will be valid for 5 minutes

    # Store OTP and expiry time in session temporarily
    session['otp'] = otp
    session['email'] = email
    session['otp_expiry'] = otp_expiry.isoformat()  # Store expiry time in ISO format

    # Send OTP to the user's email
    msg = Message('Your OTP Code', recipients=[email])
    msg.body = f'Your OTP code is {otp}. This code will expire in 5 minutes.'
    mail.send(msg)

    return render_template('verify_otp.html', email=email)
# Verify OTP
@app.route('/verify_otp', methods=['POST'])
def verify_otp():
    otp_input = request.form['otp']  # Get user input
    current_time = datetime.utcnow()  # Get current time

    # Check if the OTP and its expiry exist in the session
    if 'otp' in session and 'otp_expiry' in session:
        otp_expiry = datetime.fromisoformat(session['otp_expiry'])  # Parse expiry time

        if current_time > otp_expiry:
            flash("OTP has expired. Please request a new one.")
            session.pop('otp', None)  # Clear expired OTP
            session.pop('otp_expiry', None)
            return redirect(url_for('signin'))

        try:
            # Check if OTP is correct
            if session.get('otp') == int(otp_input):
                session['otp_verified'] = True  # Set OTP verified flag
                session.pop('otp', None)  # Clear OTP
                session.pop('otp_expiry', None)  # Clear expiry
                return redirect(url_for('dashboard'))  # Redirect to dashboard
            else:
                flash("Invalid OTP. Please try again.")
                return redirect(url_for('signin'))  # Redirect to sign-in if OTP is wrong
        except ValueError:
            flash("Invalid OTP format. Please enter a numeric OTP.")
            return redirect(url_for('signin'))  # Redirect if the input is invalid
    else:
        flash("Session expired or OTP not found. Please request a new OTP.")
        return redirect(url_for('signin'))

if __name__ == '__main__':  # Corrected here
    app.run(debug=True, port=5001)
