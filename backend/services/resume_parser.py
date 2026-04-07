import PyPDF2
from docx import Document
import spacy
import re

# Load spaCy model
nlp = spacy.load("en_core_web_sm")

# TEXT EXTRACTION

def extract_text_from_pdf(file):
    pdf_reader = PyPDF2.PdfReader(file)
    text = ""
    for page in pdf_reader.pages:
        if page.extract_text():
            text += page.extract_text() + "\n"
    return text

def extract_text_from_docx(file):
    doc = Document(file)
    text = ""
    for para in doc.paragraphs:
        text += para.text + "\n"
    return text

# BASIC INFO EXTRACTION

def extract_email(text):
    match = re.search(r"[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+", text)
    return match.group() if match else "Not Found"


def extract_phone(text):
    match = re.search(r"\b\d{10}\b", text)
    return match.group() if match else "Not Found"

def extract_name(text):
    """
    Extracts most probable name from top lines
    """
    lines = text.strip().split("\n")

    for line in lines[:10]:  # check first 10 lines
        line = line.strip()

        if not line:
            continue

        # Skip unwanted lines
        if any(keyword in line.lower() for keyword in [
            "resume", "email", "phone", "linkedin", "github"
        ]):
            continue

        if any(char.isdigit() for char in line):
            continue

        words = line.split()

        # Name usually 2-4 words
        if 2 <= len(words) <= 4:
            return line.title()

    return "Unknown"

# SKILL EXTRACTION

SKILL_DB = [
    "python", "java", "c++", "c", "sql",
    "html", "css", "javascript",
    "react", "node", "express",
    "mongodb", "mysql",
    "machine learning", "deep learning",
    "fastapi", "django", "flask",
    "bootstrap", "tailwind"
]

def extract_skills(text):
    text = text.lower()
    found_skills = set()

    for skill in SKILL_DB:
        if skill in text:
            found_skills.add(skill)

    return list(found_skills)

# EXPERIENCE EXTRACTION

def extract_experience(text):
    """
    Extract experience like:
    '3 years', '5 years experience'
    """
    matches = re.findall(r"(\d+)\+?\s*years?", text.lower())

    if matches:
        return max([int(x) for x in matches])

    return 0

# TEXT PREPROCESSING

def preprocess_text(text):
    doc = nlp(text.lower())

    tokens = [
        token.lemma_
        for token in doc
        if not token.is_stop and not token.is_punct
    ]

    return " ".join(tokens)

# MAIN PARSER

def parse_resume(file, filename):

    # Extract text
    if filename.endswith(".pdf"):
        text = extract_text_from_pdf(file)

    elif filename.endswith(".docx"):
        text = extract_text_from_docx(file)

    else:
        return None

    if not text.strip():
        return None

    # Extract structured data
    name = extract_name(text)
    email = extract_email(text)
    phone = extract_phone(text)
    skills = extract_skills(text)
    experience = extract_experience(text)
    processed_text = preprocess_text(text)

    return {
        "name": name,
        "email": email,
        "phone": phone,
        "skills": skills,
        "experience": experience,
        "raw_text": text,
        "processed_text": processed_text
    }