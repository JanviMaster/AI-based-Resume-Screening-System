from fastapi import FastAPI, UploadFile, File
from schemas.resume_schema import Resume

app = FastAPI()

@app.post("/test-upload")
async def test_upload(file: UploadFile = File(...)):

    try:
        content = await file.read()

        return {
            "filename": file.filename,
            "content_type": file.content_type,
            "size_in_bytes": len(content),
            "message": "File received successfully"
        }

    except Exception as e:
        return {
            "error": "File upload failed",
            "details": str(e)
        }