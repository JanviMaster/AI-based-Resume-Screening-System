from fastapi import FastAPI, UploadFile, File

app = FastAPI()

@app.post("/test-upload")
async def test_upload(file: UploadFile = File(...)):
    return {"filename": file.filename}