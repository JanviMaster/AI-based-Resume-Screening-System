from pydantic import BaseModel
from typing import List

class Resume(BaseModel):
    name: str
    email: str
    phone: str
    skills: List[str]
    experience: int
    raw_text: str