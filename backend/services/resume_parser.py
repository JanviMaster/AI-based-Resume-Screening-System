import PyPDF2
from docx import Document
import spacy
import re

# Load spaCy model
nlp = spacy.load("en_core_web_sm")

# ===============================
# TEXT EXTRACTION
# ===============================

def extract_text_from_pdf(file):
    pdf_reader = PyPDF2.PdfReader(file)
    text = ""
    for page in pdf_reader.pages:
        if page.extract_text():
            text += page.extract_text()
    return text


def extract_text_from_docx(file):
    doc = Document(file)
    text = ""
    for para in doc.paragraphs:
        text += para.text + "\n"
    return text


# ===============================
# BASIC INFO EXTRACTION
# ===============================

def extract_email(text):
    match = re.search(r"\S+@\S+", text)
    return match.group() if match else "Not Found"


def extract_phone(text):
    match = re.search(r"\b\d{10}\b", text)
    return match.group() if match else "Not Found"


def extract_name(text):
    """
    First try spaCy PERSON entity.
    If not found, fallback to first meaningful line.
    """
    doc = nlp(text)

    # Try AI-based name detection
    for ent in doc.ents:
        if ent.label_ == "PERSON":
            return ent.text.strip()

    # Fallback method
    lines = text.strip().split("\n")
    for line in lines:
        clean_line = line.strip()
        if clean_line and len(clean_line.split()) <= 4:
            return clean_line.title()

    return "Unknown"


# ===============================
# SKILL EXTRACTION
# ===============================

SKILL_SET = [
    "python", "java", "react", "node", "mongodb",
    "sql", "machine learning", "deep learning",
    "html", "css", "javascript", "fastapi"
]


def extract_skills(text):
    text_lower = text.lower()
    found_skills = []

    for skill in SKILL_SET:
        if skill in text_lower:
            found_skills.append(skill)

    return list(set(found_skills))


# ===============================
# EXPERIENCE EXTRACTION
# ===============================

def extract_experience(text):
    """
    Extract experience like:
    '3 years', '5 years experience'
    """
    pattern = r"(\d+)\s+years?"
    matches = re.findall(pattern, text.lower())

    if matches:
        return max([int(year) for year in matches])

    return 0


# ===============================
# TEXT PREPROCESSING (NLP)
# ===============================

def preprocess_text(text):
    doc = nlp(text.lower())

    tokens = [
        token.lemma_
        for token in doc
        if not token.is_stop and not token.is_punct
    ]

    return " ".join(tokens)


# ===============================
# MAIN PARSE FUNCTION
# ===============================

def parse_resume(file, filename):

    if filename.endswith(".pdf"):
        text = extract_text_from_pdf(file)

    elif filename.endswith(".docx"):
        text = extract_text_from_docx(file)

    else:
        return None

    processed_text = preprocess_text(text)

    data = {
        "name": extract_name(text),
        "email": extract_email(text),
        "phone": extract_phone(text),
        "skills": extract_skills(text),
        "experience": extract_experience(text),
        "raw_text": text,
        "processed_text": processed_text
    }

    return data