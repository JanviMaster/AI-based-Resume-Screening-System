from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import resume_routes, job_routes


app = FastAPI()

app.include_router(resume_routes.router, prefix="/resume")
app.include_router(job_routes.router, prefix="/job")
# app.include_router(resume_routes.router)
# app.include_router(job_routes.router)
    
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Backend is Running"}