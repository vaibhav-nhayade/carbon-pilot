from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api import auth, facilities, users
from app.core.config import settings
from app.core.database import Base, engine
from app.models import Facility, User


Base.metadata.create_all(bind=engine)


app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origin_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health_check():
    return {
        "status": "ok",
        "service": "carbonpilot-backend",
    }


app.include_router(
    auth.router,
    prefix="/api",
)

app.include_router(
    users.router,
    prefix="/api",
)

app.include_router(
    facilities.router,
    prefix="/api",
)