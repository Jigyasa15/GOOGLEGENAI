# Project Notify AI

Notify AI is a multi-agent Gen AI system designed to revolutionize marketing campaigns by generating hyper-personalized, data-driven content, enhancing audience segmentation, optimizing campaign scheduling, and providing real-time adaptability.

## Installation

To set up the project, please install the following dependencies:

### Step 1: Clone the repository
```bash
git clone https://github.com/Jigyasa15/GOOGLEGENAI.git
cd GOOGLEGENAI
```

### Step 2: Set up environment variables
Create a `.env` file in the project root with the following variables:
```
GOOGLE_API_KEY=your_google_api_key
FLASK_SECRET_KEY=your_flask_secret_key
```

### Step 3: Install required libraries

Install the dependencies listed below:
```bash
pip install Flask
pip install Flask-Mail
pip install python-dotenv
pip install Authlib
pip install pandas
pip install langchain
pip install google-generativeai
pip install Flask-Session
pip install Flask-WTF
pip install langchain-google-genai
pip install aiohttp
```

### Step 4: Running the application

To run the application, use the following command:
```bash
flask run
```

Make sure your Google Generative AI API key is active for the integration to work.

### Step 5: Environment setup

Ensure you have Python 3.9+ installed and properly configured on your system. You can create a virtual environment for dependency management:
```bash
python3 -m venv venv
source venv/bin/activate
```

### Step 6: Additional Setup (Optional)

For handling OAuth:
```bash
pip install authlib
```

If you encounter issues with email functionality, check your SMTP configurations for Flask-Mail in the `.env` file:
```
MAIL_SERVER=smtp.yourprovider.com
MAIL_PORT=587
MAIL_USE_TLS=True
MAIL_USERNAME=your_username
MAIL_PASSWORD=your_password
```

## Usage

Once installed, you can access the application via `http://127.0.0.1:5001`. The main functionalities include:
- OTP-based authentication
- Business details input
- AI-based audience segmentation
- Custom content generation
- Campaign scheduling and delivery insights

### Development

For contributing to this project, follow the general guidelines:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.