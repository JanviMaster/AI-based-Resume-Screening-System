from fastapi import APIRouter, UploadFile, File
from services.resume_parser import parse_resume
from database import resume_collection
from io import BytesIO

router = APIRouter()

@router.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):

    content = await file.read()

    # Convert bytes → file-like object
    file_object = BytesIO(content)

    parsed_data = parse_resume(file_object, file.filename)

    # Insert into MongoDB
    result = resume_collection.insert_one(parsed_data)

    # Convert ObjectId to string
    parsed_data["_id"] = str(result.inserted_id)

    return {
        "message": "Resume uploaded successfully",
        "data": parsed_data
    }