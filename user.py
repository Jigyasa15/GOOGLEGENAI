"""
Install the Google AI Python SDK

$ pip install google-generativeai
"""

import os
import time
import google.generativeai as genai
import csv

genai.configure(api_key=os.environ["GOOGLE_API_KEY"])

# def upload_to_gemini(path, mime_type=None):
#   """Uploads the given file to Gemini.

#   See https://ai.google.dev/gemini-api/docs/prompting_with_media
#   """
#   file = genai.upload_file(path, mime_type=mime_type)
#   print(f"Uploaded file '{file.display_name}' as: {file.uri}")
#   return file

# def wait_for_files_active(files):
#   """Waits for the given files to be active.

#   Some files uploaded to the Gemini API need to be processed before they can be
#   used as prompt inputs. The status can be seen by querying the file's "state"
#   field.

#   This implementation uses a simple blocking polling loop. Production code
#   should probably employ a more sophisticated approach.
#   """
#   print("Waiting for file processing...")
#   for name in (file.name for file in files):
#     file = genai.get_file(name)
#     while file.state.name == "PROCESSING":
#       print(".", end="", flush=True)
#       time.sleep(10)
#       file = genai.get_file(name)
#     if file.state.name != "ACTIVE":
#       raise Exception(f"File {file.name} failed to process")
#   print("...all files ready")
#   print()


# Create the model
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
  # safety_settings = Adjust safety settings
  # See https://ai.google.dev/gemini-api/docs/safety-settings
)

# TODO Make these files available on the local file system
# You may need to update the file paths
# files = [
#   upload_to_gemini("Updated_User_Event_Data_with_User_Count.csv", mime_type="text/csv"),
# ]

# # Some files have a processing delay. Wait for them to be ready.
# wait_for_files_active(files)
def extract_csv(pathname: str) -> list[str]:
    parts = [f"--- STSRT OF CSV ${pathname}"]
    with open(pathname,"r",newline="") as csvfile:
        csv_reader=csv.reader(csvfile)
        for row in csv_reader:
          str=" "
          parts.append(str.join(row))
    
    return parts


        
chat_session = model.start_chat(
  history=[
    {
      "role": "user",
      "parts":
        extract_csv("static/Updated_User_Event_Data_with_User_Count.csv")
      ,
    },
  ]
)

response = chat_session.send_message("""You're a data scientist. You're task is to provide summary insights to identify when is the best time to send push notifications to users to achieve maximum user engagement and boost conversion based on below csv file.Keep the output format as the sample shown below and make sure output format is user friendly as this will be shown in the webpage. Don't use column name and * in output.Push Notification Timing Insights:
Based on your customer data, here are some insights to identify the best time to send push notifications for maximum user engagement and conversion:
1. Overall Best Hours:
2. Segment-Specific Timing:
3. Event-Specific Timing:
4. Additional Considerations:
5. Recommendations:
""")

print(response.text)