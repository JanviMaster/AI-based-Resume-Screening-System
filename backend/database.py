import os
from pymongo import MongoClient
from dotenv import load_dotenv

client = MongoClient(os.getenv("mongodb://localhost:27017/"))
db = client["resume_screening"]

resume_collection = db["resumes"]
jd_collection = db["job_descriptions"]