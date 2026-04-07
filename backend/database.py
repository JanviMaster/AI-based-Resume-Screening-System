import os
from pymongo import MongoClient
from dotenv import load_dotenv

client = MongoClient(os.getenv("mongodb_password"))
db = client["resume_screening"]

resume_collection = db["resumes"]
jd_collection = db["job_descriptions"]