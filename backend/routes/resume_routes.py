from fastapi import APIRouter, UploadFile, File
from services.resume_parser import parse_resume
from database import resume_collection
from io import BytesIO
from schemas.resume_schema import Resume
from fastapi import HTTPException

router = APIRouter()

@router.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):

    # Read file
    content = await file.read()

    # Convert bytes → file-like object
    file_object = BytesIO(content)

    # Parse resume FIRST ✅
    parsed_data = parse_resume(file_object, file.filename)

    if not parsed_data:
        return {"error": "Invalid file format"}

    # Check duplicate using email ✅
    existing = resume_collection.find_one({
        "email": parsed_data.get("email")
    })
    existing = resume_collection.find_one({
    "email": parsed_data.get("email")
    })

    if existing:
        return {"message": "Resume already exists"}
    
    if not parsed_data:
        raise HTTPException(status_code=400, detail="Invalid resume")
    
    if existing:
        return {
            "message": "Resume already exists",
        }