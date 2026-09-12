from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.dependencies import get_current_user
from app.core.database import get_db
from app.models.facility import Facility
from app.models.user import User
from app.schemas.facility import (
    FacilityCreate,
    FacilityResponse,
)


router = APIRouter(
    prefix="/facilities",
    tags=["Facilities"],
)


@router.post(
    "",
    response_model=FacilityResponse,
    status_code=status.HTTP_201_CREATED,
)
def create_facility(
    payload: FacilityCreate,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    facility = Facility(
        owner_id=current_user.id,
        name=payload.name.strip(),
        industry_type=payload.industry_type.strip(),
        location=payload.location,
        description=payload.description,
    )

    db.add(facility)
    db.commit()
    db.refresh(facility)

    return facility


@router.get(
    "",
    response_model=list[FacilityResponse],
)
def list_facilities(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return (
        db.query(Facility)
        .filter(Facility.owner_id == current_user.id)
        .order_by(Facility.created_at.desc())
        .all()
    )


@router.get(
    "/{facility_id}",
    response_model=FacilityResponse,
)
def get_facility(
    facility_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    facility = (
        db.query(Facility)
        .filter(
            Facility.id == facility_id,
            Facility.owner_id == current_user.id,
        )
        .first()
    )

    if not facility:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Facility not found.",
        )

    return facility