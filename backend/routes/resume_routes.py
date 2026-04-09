from fastapi import APIRouter, UploadFile, File
from services.resume_parser import parse_resume
from database import resume_collection
from io import BytesIO

router = APIRouter()

@router.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):

    try:
        content = await file.read()
        file_object = BytesIO(content)

        parsed_data = parse_resume(file_object, file.filename)

        if not parsed_data:
            return {"error": "Invalid resume format"}

        print("Parsed Data:", parsed_data)

        result = resume_collection.insert_one(parsed_data)

        parsed_data["_id"] = str(result.inserted_id)

        return {
            "message": "Resume uploaded successfully",
            "data": parsed_data
        }

    except Exception as e:
        print("ERROR:", str(e))
        return {"error": str(e)}
 