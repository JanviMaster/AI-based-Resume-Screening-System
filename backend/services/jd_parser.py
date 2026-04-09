import re
from services.resume_parser import extract_skills, preprocess_text


# EXTRACT EXPERIENCE FROM JD

def extract_required_experience(job_description):
    """
    Extract required years of experience from JD.
    Example: '2 years experience'
    """

    match = re.search(r"(\d+)\s+years?", job_description.lower())

    if match:
        return int(match.group(1))

    return 0


# EXTRACT JOB ROLE (OPTIONAL)

def extract_job_role(job_description):
    """
    Try to detect role like 'Frontend Developer'
    """

    jd = job_description.lower()

    if "frontend" in jd:
        return "Frontend Developer"
    elif "backend" in jd:
        return "Backend Developer"
    elif "fullstack" in jd:
        return "Full Stack Developer"
    elif "data" in jd:
        return "Data Scientist"
    elif "machine learning" in jd:
        return "ML Engineer"

    return "General"


# EXTRACT KEYWORDS

def extract_keywords(job_description):
    """
    Extract important keywords (non-stopwords)
    """

    processed = preprocess_text(job_description)
    return list(set(processed.split()))


# MAIN JD PARSER

def parse_job_description(job_description):

    skills = extract_skills(job_description)
    experience = extract_required_experience(job_description)
    role = extract_job_role(job_description)
    keywords = extract_keywords(job_description)

    return {
        "skills": skills,
        "required_experience": experience,
        "role": role,
        "keywords": keywords,
        "raw_text": job_description
    }