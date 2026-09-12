from datetime import datetime

from pydantic import BaseModel, Field


class FacilityCreate(BaseModel):
    name: str = Field(min_length=2, max_length=200)
    industry_type: str = Field(min_length=2, max_length=120)
    location: str | None = Field(default=None, max_length=255)
    description: str | None = None


class FacilityResponse(BaseModel):
    id: str
    name: str
    industry_type: str
    location: str | None
    description: str | None
    created_at: datetime
    updated_at: datetime

    model_config = {
        "from_attributes": True,
    }