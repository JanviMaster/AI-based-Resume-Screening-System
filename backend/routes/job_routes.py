from fastapi import APIRouter
from database import resume_collection
from services.job_matcher import calculate_final_score
from schemas.resume_schema import Resume

router = APIRouter()

@router.post("/match-resume")
async def match_resume(job_description: str):

    resumes = list(resume_collection.find())

    print("JD:", job_description)
    print("Total resumes:", len(resumes))

    results = []
    seen_emails = set()  
    for resume in resumes:

        name = resume.get("name", "Unknown")
        email = resume.get("email")

        if not name or name.lower() in ["unknown", "borivali", "kandivali"]:
            continue

        if email in seen_emails:
            continue
        seen_emails.add(email)

        score_data = calculate_final_score(resume, job_description)

        results.append({
            "candidate": name,
            "scores": score_data
        })

    results.sort(
        key=lambda x: x["scores"]["final_score"],
        reverse=True
    )

    print("Final Results:", results)

    return results