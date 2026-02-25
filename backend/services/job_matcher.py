import spacy
from services.resume_parser import preprocess_text, extract_skills

nlp = spacy.load("en_core_web_sm")


# =====================================
# SKILL MATCHING
# =====================================

def calculate_skill_match(resume_skills, job_description):
    """
    Match resume skills against skills extracted from job description.
    """

    job_skills = extract_skills(job_description)

    if not job_skills:
        return 0

    matched = 0

    for skill in job_skills:
        if skill in resume_skills:
            matched += 1

    return (matched / len(job_skills)) * 100


# =====================================
# TEXT SIMILARITY (NLP)
# =====================================

def calculate_text_similarity(resume_text, job_description):
    """
    Uses spaCy similarity.
    Note: en_core_web_sm has weak vectors.
    We'll upgrade later to transformer model.
    """

    processed_resume = preprocess_text(resume_text)
    processed_job = preprocess_text(job_description)

    doc1 = nlp(processed_resume)
    doc2 = nlp(processed_job)

    if not doc1.vector_norm or not doc2.vector_norm:
        return 0

    similarity = doc1.similarity(doc2)

    return similarity * 100


# =====================================
# EXPERIENCE SCORING
# =====================================

def calculate_experience_score(resume_experience):
    """
    Score experience out of 100.
    0-10 years mapped proportionally.
    """

    if resume_experience <= 0:
        return 0

    return min((resume_experience / 10) * 100, 100)


# =====================================
# FINAL AI SCORE
# =====================================

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
        resume_experience
    )

    # Weighted scoring
    final_score = (
        (skill_score * 0.5) +
        (similarity_score * 0.4) +
        (experience_score * 0.1)
    )

    return {
        "skill_score": round(skill_score, 2),
        "similarity_score": round(similarity_score, 2),
        "experience_score": round(experience_score, 2),
        "final_score": round(final_score, 2)
    }