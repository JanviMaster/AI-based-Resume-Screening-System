from fastapi import APIRouter
from database import resume_collection
from services.job_matcher import calculate_final_score

router = APIRouter()

@router.post("/match-resume")
async def match_resume(job_description: str):

    resumes = list(resume_collection.find())

    results = []

    for resume in resumes:

        score_data = calculate_final_score(resume, job_description)

        resume["_id"] = str(resume["_id"])

        results.append({
            "candidate": resume["name"],
            "scores": score_data
        })

    # Sort by final score
    results.sort(
        key=lambda x: x["scores"]["final_score"],
        reverse=True
    )

    return results