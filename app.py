# from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify
# from dotenv import load_dotenv
# import os 
# import pandas as pd
# import logging
# from google.cloud import aiplatform

# from flask_mail import Mail, Message
# from datetime import datetime, timedelta
# import random
# from authlib.integrations.flask_client import OAuth

# app = Flask(__name__)  # Corrected here
# app.secret_key = os.getenv('secret_key')

# load_dotenv()
# import vertexai

# GOOGLE_OAUTH_CLIENT_ID = os.getenv("GOOGLE_OAUTH_CLIENT_ID")
# GOOGLE_OAUTH_CLIENT_SECRET = os.getenv("GOOGLE_OAUTH_CLIENT_SECRET")
# import re
# import urllib
# import warnings
# from pathlib import Path

# # import backoff
# # import pandas as pd
# # import PyPDF2
# # import ratelimit
# # from google.api_core import exceptions
# # from tqdm import tqdm
# from vertexai.generative_models import GenerationConfig, GenerativeModel
# warnings.filterwarnings("ignore")
# generation_config = GenerationConfig(temperature=0.1, max_output_tokens=256)
# # Set Google Application Credentials (path to your service account key JSON file)
# os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = "/Users/jigyasa/Downloads/elevated-summer-436915-p7-390d4dc62cad.json"

# # Initialize Vertex AI API
# aiplatform.init(project=os.getenv('GOOGLE_PROJECT'), location=os.getenv('GOOGLE_LOCATION'))

# generation_model = GenerativeModel("text-bison@001")

# PROMPT_TEMPLATE = """
# Generate a marketing prompt for a campaign with the following details:
# Campaign Name: {campaign_name}
# Campaign Goal: {campaign_goal}
# Customer Data Insights: {csv_data}
# """

# CSV_ANALYSIS_PROMPT = """
# Analyze the following customer data and extract key trends, patterns, and attributes that would help generate a customer segment for targeted marketing.

# {csv_data}
# """



# # Configure Flask-Mail
# app.config['MAIL_SERVER'] = 'smtp.gmail.com'
# app.config['MAIL_PORT'] = 587
# app.config['MAIL_USE_TLS'] = True
# app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')  # Your email
# app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')   # Your email password
# app.config['MAIL_DEFAULT_SENDER'] = 'abhisheksauray34@gmail.com'
# mail = Mail(app)

# # Configure OAuth
# oauth = OAuth(app)
# google = oauth.register(
#     name='google',
#     client_id=GOOGLE_OAUTH_CLIENT_ID,
#     client_secret=GOOGLE_OAUTH_CLIENT_SECRET,
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

# @app.route('/analytics')
# def analytics():
#     return render_template('analytics.html')

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
#      # Check if the OTP is verified
#     if 'otp_verified' not in session or not session['otp_verified']:
#         flash("You need to verify your OTP first.")
#         return redirect(url_for('signin'))
    
#     return render_template('dashboard.html') # Render your dashboard template here

# # Send OTP Email
# @app.route('/send_otp', methods=['POST'])
# def send_otp():
#     email = request.form['email']

#     # Generate a random OTP
#     otp = random.randint(100000, 999999)
    
#     # Get the current time (UTC) and set an expiration time (e.g., 5 minutes)
#     now = datetime.utcnow()
#     otp_expiry = now + timedelta(minutes=5)  # OTP will be valid for 5 minutes

#     # Store OTP and expiry time in session temporarily
#     session['otp'] = otp
#     session['email'] = email
#     session['otp_expiry'] = otp_expiry.isoformat()  # Store expiry time in ISO format

#     # Send OTP to the user's email
#     msg = Message('Your OTP Code', recipients=[email])
#     msg.body = f'Your OTP code is {otp}. This code will expire in 5 minutes.'
#     mail.send(msg)

#     return render_template('verify_otp.html', email=email)
# # Verify OTP
# @app.route('/verify_otp', methods=['POST'])
# def verify_otp():
#     otp_input = request.form['otp']  # Get user input
#     current_time = datetime.utcnow()  # Get current time

#     # Check if the OTP and its expiry exist in the session
#     if 'otp' in session and 'otp_expiry' in session:
#         otp_expiry = datetime.fromisoformat(session['otp_expiry'])  # Parse expiry time

#         if current_time > otp_expiry:
#             flash("OTP has expired. Please request a new one.")
#             session.pop('otp', None)  # Clear expired OTP
#             session.pop('otp_expiry', None)
#             return redirect(url_for('signin'))

#         try:
#             # Check if OTP is correct
#             if session.get('otp') == int(otp_input):
#                 session['otp_verified'] = True  # Set OTP verified flag
#                 session.pop('otp', None)  # Clear OTP
#                 session.pop('otp_expiry', None)  # Clear expiry
#                 return redirect(url_for('dashboard'))  # Redirect to dashboard
#             else:
#                 flash("Invalid OTP. Please try again.")
#                 return redirect(url_for('signin'))  # Redirect to sign-in if OTP is wrong
#         except ValueError:
#             flash("Invalid OTP format. Please enter a numeric OTP.")
#             return redirect(url_for('signin'))  # Redirect if the input is invalid
#     else:
#         flash("Session expired or OTP not found. Please request a new OTP.")
#         return redirect(url_for('signin'))

# @app.route('/submit_business_details', methods=['POST'])
# def submit_business_details():
#     # Save the form data in the session
#     session['business_name'] = request.form.get('businessName')
#     session['industry'] = request.form.get('industry')
#     session['other_industry'] = request.form.get('otherIndustry')
#     session['business_description'] = request.form.get('businessDescription')
#     session['primary_color'] = request.form.get('primaryColor')
#     session['secondary_color'] = request.form.get('secondaryColor')
#     session['tertiary_color'] = request.form.get('tertiaryColor')
#     session['font_size'] = request.form.get('fontSize')
#     session['font_style'] = request.form.get('fontStyle')

#     # Handle the business logo file upload (if needed)
#     business_logo = request.files.get('businessLogo')
#     if business_logo:
#         business_logo.save(f"static/uploads/{business_logo.filename}")
#         session['business_logo'] = f"/static/uploads/{business_logo.filename}"

#     return jsonify({"success": True})

# @app.route('/get_business_details', methods=['GET'])
# def get_business_details():
#     business_details = {
#         'business_name': session.get('business_name'),
#         'industry': session.get('industry'),
#         'other_industry': session.get('other_industry'),
#         'business_description': session.get('business_description'),
#         'primary_color': session.get('primary_color'),
#         'secondary_color': session.get('secondary_color'),
#         'tertiary_color': session.get('tertiary_color'),
#         'font_size': session.get('font_size'),
#         'font_style': session.get('font_style'),
#         'business_logo': session.get('business_logo'),
#     }
#     return jsonify(business_details)


# def read_and_prepare_csv(file):
#     """Reads CSV and prepares it for AI analysis."""
#     try:
#         df = pd.read_csv(file)
#         return df.to_string()  # Convert the entire DataFrame to a string for AI processing
#     except Exception as e:
#         return f"Error processing CSV: {str(e)}"

# def analyze_csv_with_vertex_ai(csv_data):
#     # """Send the CSV data to Vertex AI for analysis."""
#     # prompt = CSV_ANALYSIS_PROMPT.format(csv_data=csv_data[:30000])

#     # # Use Vertex AI Text Generation model
#     # # Use the model to summarize the text using the prompt
#     # summary = generation_model.predict(prompt=prompt,max_output_tokens=1024)
#     # return summary  # Return AI-generated CSV insights
#     """Send the CSV data to Vertex AI for analysis."""
#     prompt = CSV_ANALYSIS_PROMPT.format(csv_data=csv_data[:30000])

#     # Use Vertex AI Text Generation model
#     # Correct format for input
#     # instances = [{"content": prompt}]
    
#     # # Make the prediction call
#     # response = generation_model.predict(instances=instances, parameters={"max_output_tokens": 1024})

#     # # Extract the generated text from the response
#     # summary = response.predictions[0]["content"]
#     summary = generation_model.generate_content(
#     contents=prompt, generation_config=generation_config)
#     logging.basicConfig(level=logging.DEBUG)

# # Example of logging instead of print
#     logging.debug(f"Response from Vertex AI: {summary}")
#     return summary  # Return AI-generated CSV insights
    

# def generate_predefined_prompt(campaign_name, campaign_goal, csv_data):
#     """Generate predefined prompt using Vertex AI."""
    
#     prompt = PROMPT_TEMPLATE.format(
#         campaign_name=campaign_name,
#         campaign_goal=campaign_goal,
#         csv_data=csv_data
#     )
    
#     model = aiplatform.TextGenerationModel.from_pretrained("text-bison@001")
#     response = model.predict(prompt)
    
#     return response.text

# @app.route('/generate-prompt', methods=['POST'])
# def generate_prompt():
#     """Handle predefined prompt generation based on user inputs."""
#     # Capture campaign details
#     campaign_name = request.form.get('campaignName')
#     campaign_goal = request.form.get('campaignGoal')
    
#     # Handle CSV file upload
#     csv_file = request.files.get('customerData')
#     if csv_file:
#         csv_data_string = read_and_prepare_csv(csv_file)
#         csv_insights = analyze_csv_with_vertex_ai(csv_data_string)
#     else:
#         csv_insights = "No customer data provided."
    
#     # Generate the predefined prompt using Vertex AI
#     predefined_prompt = generate_predefined_prompt(campaign_name, campaign_goal, csv_insights)
    
#     return jsonify({'predefined_prompt': predefined_prompt})

# if __name__ == '__main__':  # Corrected here
#     app.run(debug=True, port=5001)

from flask import Flask, render_template, request, redirect, url_for, session, flash, jsonify
import os
import asyncio
import google.generativeai as genai
import langchain
import pandas as pd
# from google.cloud import aiplatform
from flask_mail import Mail, Message
from datetime import datetime, timedelta
import random
from langchain.prompts import PromptTemplate
from langchain.schema.output_parser import StrOutputParser
from langchain.chat_models import init_chat_model
from langchain_google_genai import ChatGoogleGenerativeAI

# from google.cloud import aiplatform


from dotenv import load_dotenv
load_dotenv()


from authlib.integrations.flask_client import OAuth


genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))



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


@app.route('/analytics')
def analytics():
   return render_template('analytics.html')


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


@app.route('/submit_business_details', methods=['POST'])
def submit_business_details():
   # Save the form data in the session
   session['business_name'] = request.form.get('businessName')
   session['industry'] = request.form.get('industry')
   session['other_industry'] = request.form.get('otherIndustry')
   session['business_description'] = request.form.get('businessDescription')
   session['primary_color'] = request.form.get('primaryColor')
   session['secondary_color'] = request.form.get('secondaryColor')
   session['tertiary_color'] = request.form.get('tertiaryColor')
   session['font_size'] = request.form.get('fontSize')
   session['font_style'] = request.form.get('fontStyle')


   # Handle the business logo file upload (if needed)
   business_logo = request.files.get('businessLogo')
   if business_logo:
       business_logo.save(f"static/uploads/{business_logo.filename}")
       session['business_logo'] = f"/static/uploads/{business_logo.filename}"


   return jsonify({"success": True})


@app.route('/get_business_details', methods=['GET'])
def get_business_details():
   business_details = {
       'business_name': session.get('business_name'),
       'industry': session.get('industry'),
       'other_industry': session.get('other_industry'),
       'business_description': session.get('business_description'),
       'primary_color': session.get('primary_color'),
       'secondary_color': session.get('secondary_color'),
       'tertiary_color': session.get('tertiary_color'),
       'font_size': session.get('font_size'),
       'font_style': session.get('font_style'),
       'business_logo': session.get('business_logo'),
   }
   return jsonify(business_details)






PROMPT_TEMPLATE = """
Generate a marketing prompt for a campaign with the following details:
Campaign Name: {campaign_name}
Campaign Goal: {campaign_goal}
Customer Data Insights: {csv_data}
"""


# CSV_ANALYSIS_PROMPT = """
# Analyze the following customer data and extract key trends, patterns, and attributes that would help generate a customer segment for targeted marketing.


# {csv_data}
# """


CSV_ANALYSIS_PROMPT ="Write a story about a magic backpack."


def read_and_prepare_csv(file):
   """Reads CSV and prepares it for AI analysis."""
   try:
       df = pd.read_csv(file)
       return df.to_string()  # Convert the entire DataFrame to a string for AI processing
   except Exception as e:
       return f"Error processing CSV: {str(e)}"


def analyze_csv_with_vertex_ai(csv_data):
   """Send the CSV data to Vertex AI for analysis."""
   prompt = CSV_ANALYSIS_PROMPT.format(csv_data=csv_data)


   # Use Gemini AI Text Generation model


   model = genai.GenerativeModel("gemini-1.5-flash")
   PROMPT_FINAL =PromptTemplate(template=CSV_ANALYSIS_PROMPT, input_variables=["csv_data"])
   response = model.generate_content("PROMPT_FINAL")




   if response and 'candidates' in response:
    for candidate in response['candidates']:
       print(candidate['output'])
   else:
      print("No text generated")
      print(response)
 


   return response.text  # Return AI-generated CSV insights


def generate_predefined_prompt(campaign_name, campaign_goal, csv_data):
   """Generate predefined prompt using Gemini AI."""
  
   prompt = PROMPT_TEMPLATE.format(
       campaign_name=campaign_name,
       campaign_goal=campaign_goal,
       csv_data=csv_data
   )
   print(campaign_name)
   print(campaign_goal)
   print(csv_data)
   model = genai.GenerativeModel("gemini-1.5-flash")
  
   PROMPT_FINAL =PromptTemplate(template=PROMPT_TEMPLATE, input_variables=["campaign_name", "campaign_goal","csv_data"])
   response = model.generate_content("PROMPT_FINAL")
 
  
   if response and 'candidates' in response:
    for candidate in response['candidates']:
       print(candidate['output'])
   else:
      print("No text generated")
      print(response)



# Initialize Google Generative AI
llm = genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))

# Function to generate predefined prompt based on user input
def generate_predefined_prompt(campaign_name, campaign_goal, business_description, industry):
    """Generate predefined prompt using Gemini AI."""
    llm = ChatGoogleGenerativeAI(
                                 model="gemini-1.5-pro",
                                 temperature=0,
                                 max_tokens=100,) 
    prompt_template = PromptTemplate.from_template(template="You are a marketing and prompt generation expert in the {industry} industry with experience in {business_description}. Provide a prompt to generate the top 3 target segment names based on the campaign goal: {campaign_goal} based on these details.Keep the tone formal")
    prompt = prompt_template.format(industry=industry, business_description=business_description, campaign_goal=campaign_goal)
    
    # Use the AI to generate the predefined prompt
   #  llm = genai.GenerativeModel(model="gemini-1.5-pro", temperature=0, max_tokens=100)
   #  response = llm.generate_content(prompt_template)
    ai_msg =  llm.invoke(prompt)
    predefined_prompt = ai_msg.content
    # Extract the generated prompt from the response
   #  predefined_prompt = response.candidates[0].content.parts[0].text
    return predefined_prompt

# Function to generate segments based on the predefined prompt
def generate_segments(predefined_prompt):
    """Generate target segments based on predefined prompt."""
    
    # Create a new prompt to generate segments
   #  segment_prompt_template = f"Prompt: {predefined_prompt}. In the output, give only 3 distinct target segments names, comma-separated, no extra text within 15 words."
    
   #  # Use AI to generate the segments
   #  llm = genai.GenerativeModel(model="gemini-1.5-pro", temperature=0, max_tokens=100)
   #  response = llm.generate_content(segment_prompt_template)
    llm = ChatGoogleGenerativeAI(
                                 model="gemini-1.5-pro",
                                 temperature=0,
                                 max_tokens=100,) 
    segment_prompt_template = PromptTemplate.from_template(template="Prompt: {predefined_prompt}. In the output give 3 distinct target segmnent comma seperated in 15 words")
    segment_prompt = segment_prompt_template.format(predefined_prompt=predefined_prompt)
    ai_segment_msg =  llm.invoke(segment_prompt)
    
    
    # Extract the generated segments from the response
    segments = ai_segment_msg.content.split(',')    
    return [segment.strip() for segment in segments]

# Route to generate predefined prompt
@app.route('/generate-predefined-prompt', methods=['POST'])
def generate_predefined_prompt_route():
    """Handle the predefined prompt generation based on user inputs."""
    
    # Capture campaign details from the form
    campaign_name = request.form.get('campaignName')
    campaign_goal = request.form.get('campaignGoal')
    business_description = session.get('business_description')
    industry = session.get('industry')

    # Generate the predefined prompt
    predefined_prompt = generate_predefined_prompt(campaign_name, campaign_goal, business_description, industry)
    
    # Return the predefined prompt as JSON response
    return jsonify({'predefined_prompt': predefined_prompt})

# Route to generate segments based on predefined prompt
@app.route('/generate-segments', methods=['POST'])
def generate_segments_route():
    """Handle segment generation based on the predefined prompt."""
    # Get the predefined prompt from the form data
    predefined_prompt = request.form.get('predefinedPrompt')
    if predefined_prompt and predefined_prompt.strip():
    # Generate the segments
     segments = generate_segments(predefined_prompt)   
    else :
      custom_prompt = request.form.get('customPrompt')
      segments = generate_segments(custom_prompt)
    
    # Return the segments as JSON response
    return jsonify({
        'segment_1': segments[0],
        'segment_2': segments[1],
        'segment_3': segments[2]
    })

if __name__ == '__main__':
    app.run(debug=True, port=5001)


# @app.route('/generate-prompt', methods=['POST'])
# def generate_prompt():
#     """Handle predefined prompt generation based on user inputs."""
    
#     # Capture campaign details
#     campaign_name = request.form.get('campaignName')
#     campaign_goal = request.form.get('campaignGoal')
#     business_description = session.get('business_description')
#     industry = session.get('industry')

#     # Initialize the ChatGoogleGenerativeAI model
#     # llm = ChatGoogleGenerativeAI(
#     #     model="gemini-1.5-pro",
#     #     temperature=0,
#     #     max_tokens=1024,
#     #     timeout=None,
#     #     max_retries=2,
#     #     # other params...
#     # )
#     # llm = ChatGoogleGenerativeAI(model="gemini-pro") 
#     llm = genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))
#     llm = ChatGoogleGenerativeAI(
#                                  model="gemini-1.5-pro",
#                                  temperature=0,
#                                  max_tokens=100,) 
#     # Define the messages for the AI prompt
    
#     prompt_template = PromptTemplate.from_template(template="You are a marketing and prompt generation expert in the {industry} industry with experience in {business_description}. Provide a prompt to generate the top 3 target segment names based on the campaign goal: {campaign_goal} based on these details.Keep the tone formal")
#     prompt = prompt_template.format(industry=industry, business_description=business_description, campaign_goal=campaign_goal)
#     print(prompt)
#     ai_msg =  llm.invoke(prompt)
#     predefined_prompt = ai_msg.content
#     segment_prompt_template = PromptTemplate.from_template(template="Prompt: {predefined_prompt}. In the output give 3 distinct target segmnent comma seperated in 15 words")
#     segment_prompt = segment_prompt_template.format(predefined_prompt=predefined_prompt)
#     ai_segment_msg =  llm.invoke(segment_prompt)
#     print(ai_segment_msg.content)
#     # ai_msg = chain.invoke(input={"industry": industry, "business_description": business_description, "campaign_goal": campaign_goal})
    
    

#     # Get the AI's response
#     # ai_msg =  llm.invoke(messages)
#    #  print(ai_msg)
#    #  print(ai_msg.content)

#     # Use Gemini AI for content generation working code 
#    #  model = genai.GenerativeModel("gemini-1.5-flash")
#    #  response = model.generate_content("Write a story about a magic backpack.")
#    #  predefined_prompt = response.candidates[0].content.parts[0].text
    
#     # Return the generated prompt as JSON response
#     return jsonify({'predefined_prompt': predefined_prompt})


# if __name__ == '__main__':
#     app.run(debug=True, port=50001)

# def generate_prompt():
#    """Handle predefined prompt generation based on user inputs."""
  
#    # Capture campaign details
#     campaign_name = request.form.get('campaignName')
#    campaign_goal = request.form.get('campaignGoal')
#    business_description = session.get('business_description')
#    industry = session.get('industry')
#    llm = ChatGoogleGenerativeAI(
#     model="gemini-1.5-pro",
#     temperature=0,
#     max_tokens=1024,
#     timeout=None,
#     max_retries=2,
#     # other params...
# )
#     messages = [
#     (
#         "system",
#         "You are a marketing and prompt generation expert of {industry} industry having experience in {business_description}. Provide a prompt to generate best target segmenent based on campaign goal {campaign_goal}",
#     )
# ]
#     ai_msg = llm.invoke(messages)
#     print(ai_msg)
#     print(ai_msg.content)
#     model = genai.GenerativeModel("gemini-1.5-flash")
#     response = model.generate_content("Write a story about a magic backpack.")
#     predefined_prompt = response.candidates[0].content.parts[0].text
#         return jsonify({'predefined_prompt': predefined_prompt})

# if __name__ == '__main__':  # Corrected here
#    app.run(debug=True, port=50001)
#    print(industry)
#    print(business_description)
#    business_description = request.form('business_description')
#    industry = request.form('industry')
#    print(campaign_goal)
#    print(campaign_name)
#    print(business_description)
#    print(industry)
   # Handle CSV file upload
   # csv_file = request.files.get('customerData')
   # if csv_file:
   #     csv_data_string = read_and_prepare_csv(csv_file)
   #     csv_insights = analyze_csv_with_vertex_ai(csv_data_string)
   # else:
   #     csv_insights = "No customer data provided."


#    model = genai.GenerativeModel("gemini-1.5-flash")
#    response = model.generate_content("Write a story about a magic backpack.")
#    predefined_prompt = response.candidates[0].content.parts[0].text
#    return jsonify({'predefined_prompt': predefined_prompt})
#    print(response)
#    print(response.candidates[0].content.parts[0].text)
    # return response.candidates[0].content.parts[0].text
   # Extract and print the generated content
#    if response and 'candidates' in response:
#        for candidate in response['candidates']:
#           print(candidate['output'])
#    else:
#        print("No text generated")
    # print(response)
  
   # Generate the predefined prompt using Vertex AI
   # predefined_prompt = generate_predefined_prompt(campaign_name, campaign_goal, csv_insights)
# return jsonify({'predefined_prompt': predefined_prompt})
 
#  if __name__ == '__main__':  # Corrected here
#    app.run(debug=True, port=50001)
