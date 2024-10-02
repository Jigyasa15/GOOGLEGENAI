from flask import Flask, render_template, request, send_file, redirect, url_for, session, flash, jsonify
import os
import io
import time
import csv
import asyncio
import google.generativeai as genai
import langchain
import pandas as pd
from flask_mail import Mail, Message
from io import BytesIO
from datetime import datetime, timedelta
import random
from langchain.prompts import PromptTemplate
from langchain.schema.output_parser import StrOutputParser
from langchain.chat_models import init_chat_model
from langchain_google_genai import ChatGoogleGenerativeAI




from dotenv import load_dotenv
load_dotenv()


from authlib.integrations.flask_client import OAuth


genai.configure(api_key=os.getenv("GOOGLE_API_KEY"))


app = Flask(__name__)  # Corrected here
app.secret_key = 'random_secret_key'

# Define the folder where uploaded files will be stored
app.config['UPLOAD_FOLDER'] = os.path.join(os.getcwd(), 'uploads')

# Ensure the uploads directory exists
if not os.path.exists(app.config['UPLOAD_FOLDER']):
    os.makedirs(app.config['UPLOAD_FOLDER'])

# Configure Flask-Mail
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'ainotify80@gmail.com'
# os.getenv('MAIL_USERNAME')  # Your email
app.config['MAIL_PASSWORD'] = 'snyj vlph hbbg ebns'
# os.getenv('MAIL_PASSWORD')  # Your email password
app.config['MAIL_DEFAULT_SENDER'] = 'ainotify80@gmail.com'
mail = Mail(app)


# Configure OAuth
oauth = OAuth(app)
google = oauth.register(
   name='google',
   client_id= os.getenv('GOOGLE_OAUTH_CLIENT_ID'),
   client_secret= os.getenv('GOOGLE_OAUTH_CLIENT_SECRET'),
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

# Path to the static CSV file
STATIC_CSV_PATH = 'static/Marketing_Data_Campaign_with_commas copy.csv'

# Load CSV data into a Pandas DataFrame
def load_csv_data():
    df = pd.read_csv(STATIC_CSV_PATH)
    return df

@app.route('/load-campaign-data', methods=['GET'])
def load_campaign_data():
    csv_file_path = 'static/Marketing_Data_Campaign_with_commas copy.csv'  # Update with the actual path to your CSV file

    campaign_data = []
    with open(csv_file_path, newline='') as csvfile:
        reader = csv.DictReader(csvfile)
        for row in reader:
            # Normalize column names to avoid mismatches
            campaign_data.append({
                'Sent Date': row.get('Sent Date'),
                'Campaign Name': row.get('Campaign Name'),
                'Status': row.get('Status'),
                'Channel': row.get('Channel'),
                'User Segment': row.get('User Segment'),
                'Delivered': row.get('Delivered'),
                'Opened': row.get('Opened'),
                'Clicked': row.get('Clicked'),
                'Open Rate (%)': row.get('Open Rate (%)'),
                'Unsubscribe Rate (%)': row.get('Unsubscribe Rate (%)'),
                'CTR (%)': row.get('CTR (%)'),
                'Avg. Open Time (min)': row.get('Avg. Open Time (min)'),
                'Avg. Click Time (min)': row.get('Avg. Click Time (min)')
            })

    return jsonify(campaign_data)

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



def extract_csv(pathname: str) -> list[str]:
    parts = [f"--- START OF CSV ${pathname}"]
    with open(pathname,"r",newline="") as csvfile:
        csv_reader=csv.reader(csvfile)
        for row in csv_reader:
          str=" "
          parts.append(str.join(row))
    
    return parts


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
    template = ("You are a marketing expert in the {industry} industry. Based on the campaign goal of {campaign_goal}, "
            "identify and generate three distinct target segment names that effectively encapsulate the characteristics and preferences of potential customers. "
            "Consider factors such as demographics, psychographics, and behavioral patterns relevant to the {industry} industry and business {business_description}. "
            )
    predefined_prompt = template.format(industry=industry, business_description=business_description, campaign_goal=campaign_goal)
    return predefined_prompt

# Function to generate segments based on the predefined prompt
def generate_segments(predefined_prompt):
    """Generate target segments based on predefined prompt."""
    segment_prompt_template = PromptTemplate.from_template(template="{predefined_prompt}.The output should be formatted as follows: segment1, segment2, segment3 and should not contain any extra details. Where segment1, segment 2 and segment3 are the proposed segment names ")
    segment_prompt = segment_prompt_template.format(predefined_prompt=predefined_prompt)
    random_seed = str(random.random())
    final_prompt = segment_prompt + " " + random_seed

    file_path = session.get('uploaded_csv_path')
    
    if not file_path or not os.path.exists(file_path):
        return jsonify({"error": "CSV file not found"}), 400
    
    generation_config = {
  "temperature": 0.5,
  "top_p": 0.95,
  "top_k": 64,
  "max_output_tokens": 8192,
  "response_mime_type": "text/plain",
}
    model = genai.GenerativeModel(
    model_name="gemini-1.5-flash",
    generation_config=generation_config,
)

    final_prompt =  "Refer the csv data for the task" + final_prompt
    chat_session = model.start_chat(
    history=[
    {
      "role": "user",
      "parts":
        extract_csv(file_path)
      ,
    },
  ]
)
    response = chat_session.send_message(final_prompt)
    segments = response.text.split(',')
    print(response.text)  
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

@app.route('/generate-content',methods=['POST'])
def generate_content_route():
   """Handle content generation based on the predefined prompt."""
    # Get the  prompt from the form data
   prompt = request.form.get('prompt')
   print(prompt)
   contentType = request.form.get('contentType')
   llm = ChatGoogleGenerativeAI(
                                 model="gemini-1.5-flash",
                                 temperature=1,
                                 max_tokens=1024,) 
   if contentType == 'push':
      prompt_template = PromptTemplate.from_template(template="""Use this prompt: {prompt}. The output should follow a structured list format and provide 3 distinct variants for testing purposes, covering the following elements:
Output Format in array: "Title": [ "Title 1", "Title 2", "Title 3" ], "Subtitle": [ "Subtitle 1", "Subtitle 2", "Subtitle 3" ], "Message": [ "Message 1", "Message 2", "Message 3" ]. The output will just be array and no extra information apart from it.
Where Title 1 is Title 1 suggestion, Title 2 is Title 2 suggestion and Title 3 is Title 3 suggestion.
Where Subtitle 1 is Subtitle 1 suggestion, Subtitle 2 is Subtitle 2 suggestion and Subtitle 3 is Subtitle 3 suggestion. 
Where Message 1 is Message 1 suggestion, Message 2 is Message 2 suggestion and Message 3 is Message 3 suggestion.
""")
   else:
    prompt_template = PromptTemplate.from_template(template="""{prompt}.
                                                       The output should follow a structured list format and provide 3 distinct variants for testing purposes, covering the following elements: Output Format in array: 
                                  "Subject": [ "Subject 1", "Subject 2", "Subject 3" ], "Body": [ "Body 1", "Body 2", "Body 3" ], "CTA": [ "CTA 1", "CTA 2", "CTA 3" ]. The output will just be array and no extra information apart from it.
Where Subject 1 is Subject 1 suggestion, Subject 2 is Subject 2 suggestion and Subject 3 is Subject 3 suggestion
where Body 1 is Body 1 suggestion, Body 2 is Body 2 suggestion and Body 3 is Body 3 suggestion
Where CTA 1 is  CTA 1 suggestion,  CTA 2 is  CTA 2 suggestion and  CTA 3 is  CTA 3 suggestion
 """)
    
   content_generate = prompt_template.format(prompt=prompt)
   ai_push_msg =  llm.invoke(content_generate)
   response = ai_push_msg.content
   print(jsonify(response))
   return jsonify(response)

@app.route('/upload-csv', methods=['POST'])
def upload_csv():
    if 'csv_file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files['csv_file']
    
    # Save the file temporarily
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], file.filename)
    file.save(file_path)
    
    # Store the path in the session or return it to the frontend to store in sessionStorage
    session['uploaded_csv_path'] = file_path
    
    return jsonify({"file_path": file_path})





@app.route('/generate-timing', methods=['POST'])
def generate_best_timing():
     # Use session to retrieve the uploaded CSV path or get from sessionStorage via frontend
 file_path = session.get('uploaded_csv_path')
    
 if not file_path or not os.path.exists(file_path):
        return jsonify({"error": "CSV file not found"}), 400
    
 generation_config = {
  "temperature": 0,
  "top_p": 0.95,
  "top_k": 64,
  "max_output_tokens": 8192,
  "response_mime_type": "text/plain",
}
 model = genai.GenerativeModel(
  model_name="gemini-1.5-flash",
  generation_config=generation_config,
)

 contentType = request.form.get('contentType')
 timing_prompt= ("""You're a data scientist. You're task is to provide summary insights to identify when is the best time to send {contentType} notifications to users to achieve maximum user engagement and boost conversion based on below csv file.Keep the output format as the sample shown below and make sure output format is user friendly as this will be shown in the webpage. Don't use column name and * in output.
1. Overall Best Hours:
2. Segment-Specific Timing:
3. Event-Specific Timing:
4. Additional Considerations:
5. Recommendations:
""")

 chat_session = model.start_chat(
  history=[
    {
      "role": "user",
      "parts":
        extract_csv(file_path)
      ,
    },
  ]
)
 formatted_prompt = timing_prompt.format(contentType=contentType)
 best_timing = chat_session.send_message(formatted_prompt)
 response = best_timing.text
#  print(response)
 return jsonify({'best_timing': response})

@app.route('/generate-insights', methods=['POST'])
def generate_insights():
     # Use session to retrieve the uploaded CSV path or get from sessionStorage via frontend
 file_path = 'static/Marketing_Data_Campaign_with_commas copy.csv'
    
 generation_config = {
  "temperature": 0,
  "top_p": 0.95,
  "top_k": 64,
  "max_output_tokens": 8192,
  "response_mime_type": "text/plain",
}
 model = genai.GenerativeModel(
  model_name="gemini-1.5-flash",
  generation_config=generation_config,
)
 chat_session = model.start_chat(
  history=[
    {
      "role": "user",
      "parts":
        extract_csv(file_path)
      ,
    },
  ])
 prompt = request.form.get('prompt')
 insights = chat_session.send_message(prompt)
 print(insights.text)
 return jsonify({'insights': insights.text})


@app.route('/generate-predefined-content-prompt', methods=['POST'])
def generate_predefined_content_prompt():
    # Capture the form data from the request
    content_type = request.form.get('contentType')
    content_objective = request.form.get('contentObjective')
    tone = request.form.get('tone')
    campaign_goal = request.form.get('campaignGoal')
    business_description = session.get('business_description')
    industry = session.get('industry')
    target_segment = request.form.get('targetSegment')
    businessname = session.get('businessName')
    
    if content_type == 'push':
       prompt_template = """You are a content generation expert at {businessname}, a {business_description} in the {industry} industry. Based on the campaign goal of {campaign_goal}, content objective {content_objective}, and the desired tone of {tone}, please create personalized content for the {content_type} notification channel that resonates with the {target_segment}.

The content must adhere to {businessname}'s brand guidelines, using language and tone that aligns with the company's voice while engaging the target segment effectively.

Please include the following elements:

Title: A compelling headline that grabs attention, conveys the primary benefit, and incorporates high-performing keywords relevant to the target segment.

Subtitle: A supporting line that offers additional context or highlights a secondary benefit tailored to the specific needs or pain points of the target audience.

Message: Message emphasizing the key value proposition, action, or solution, encouraging immediate action with a clear call-to-action ensuring it aligns with the desires or challenges of the target segment.

Focus on producing personalized and creatively engaging content with username that adheres to the brand's voice while maximizing relevance and impact for the specified segment."""
    
    else:
      prompt_template = """You are a content generation expert at {businessname}, a {business_description} in the {industry} industry. Based on the campaign goal of {campaign_goal}, the content objective of {content_objective}, and the desired tone of {tone}, please create personalized content for the {content_type} email notification that resonates with the {target_segment}.

The content must adhere to {businessname}'s brand guidelines, using language and tone that aligns with the company's voice while engaging the target segment effectively.

Please include the following elements:

Subject: A compelling and attention-grabbing headline that incorporates high-performing keywords relevant to the target segment, conveying the primary benefit of the email.

Body: A clear and concise message that provides context, highlights secondary benefits, and addresses the specific needs or pain points of the target audience. Ensure that the body content speaks directly to the target segment and motivates action.

CTA Button: A strong, action-driven call-to-action (CTA) that encourages immediate engagement. The CTA should align with the campaign goal and the desired user action, prompting users to take the next step (e.g., learn more, buy now, sign up).

Focus on creating personalized and engaging content with username in body.Don't use username in subject and CTA. Make sure it adheres to the brand's voice while maximizing relevance, impact, and action for the specified segment. """


    content_prompt = prompt_template.format(businessname=businessname,business_description=business_description,industry=industry,content_type=content_type,content_objective=content_objective,tone=tone,campaign_goal=campaign_goal,target_segment=target_segment)
    predefined_prompt = content_prompt
    return jsonify({'predefined_prompt': predefined_prompt})

if __name__ == '__main__':
    app.run(debug=True, port=5001)
