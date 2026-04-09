import spacy
from services.resume_parser import preprocess_text, extract_skills

nlp = spacy.load("en_core_web_sm")


# SKILL MATCHING 

def calculate_skill_match(resume_skills, job_description):
    """
    Match resume skills with job description skills.
    Uses partial + flexible matching.
    """

    job_skills = extract_skills(job_description)

    if not job_skills or not resume_skills:
        return 0

    resume_skills = [s.lower() for s in resume_skills]
    job_skills = [s.lower() for s in job_skills]

    matched_skills = []

    for job_skill in job_skills:
        for resume_skill in resume_skills:
            # partial match (important upgrade 🔥)
            if job_skill in resume_skill or resume_skill in job_skill:
                matched_skills.append(job_skill)
                break

    return (len(matched_skills) / len(job_skills)) * 100


# TEXT SIMILARITY 

def calculate_text_similarity(resume_text, job_description):
    """
    Safe similarity calculation.
    Avoids spaCy vector issues.
    """

    processed_resume = preprocess_text(resume_text)
    processed_job = preprocess_text(job_description)

    doc1 = nlp(processed_resume)
    doc2 = nlp(processed_job)

    # fallback if vectors missing
    if not doc1.vector_norm or not doc2.vector_norm:
        return keyword_overlap_score(processed_resume, processed_job)

    return doc1.similarity(doc2) * 100


# KEYWORD OVERLAP (FALLBACK 🔥)

def keyword_overlap_score(text1, text2):
    words1 = set(text1.split())
    words2 = set(text2.split())

    if not words2:
        return 0

    common = words1.intersection(words2)

    return (len(common) / len(words2)) * 100


# EXPERIENCE SCORING (IMPROVED)

def calculate_experience_score(resume_experience, job_description):
    """
    Compare resume experience with job requirement.
    """

    import re

    # extract required experience from JD (e.g. "2 years")
    match = re.search(r"(\d+)\s+years?", job_description.lower())

    if match:
        required_exp = int(match.group(1))
    else:
        required_exp = 0

    if required_exp == 0:
        return min(resume_experience * 10, 100)

    # scoring logic
    if resume_experience >= required_exp:
        return 100
    else:
        return (resume_experience / required_exp) * 100


# FINAL AI SCORE (SMART WEIGHTING)

def calculate_final_score(resume, job_description):

    resume_skills = resume.get("skills", [])
    resume_text = resume.get("raw_text", "")
    resume_experience = resume.get("experience", 0)

    skill_score = calculate_skill_match(
        resume_skills,
        job_description
    )

    similarity_score = calculate_text_similarity(
        resume_text,
        job_description
    )

    experience_score = calculate_experience_score(
        resume_experience,
        job_description
    )

    # 🔥 smarter weights
    final_score = (
        (skill_score * 0.6) +        # skills more important
        (similarity_score * 0.3) +
        (experience_score * 0.1)
    )

    return {
        "skill_score": round(skill_score, 2),
        "similarity_score": round(similarity_score, 2),
        "experience_score": round(experience_score, 2),
        "final_score": round(final_score, 2)
    }