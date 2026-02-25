import os

from pymongo import MongoClient

client = MongoClient(os.getenv("MONGODB_PASSWORD"))
db = client["resume_screening"]

resume_collection = db["resumes"]
jd_collection = db["job_descriptions"]