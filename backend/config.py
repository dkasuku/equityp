import os
from pathlib import Path
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent
load_dotenv(BASE_DIR / ".env")

# Default upload target: the Next.js public/uploads folder, so images are
# served statically by Next at /uploads/<file>.
DEFAULT_UPLOAD_DIR = BASE_DIR.parent / "nextjs" / "public" / "uploads"


def _normalize_database_url(url: str) -> str:
    """Railway and some providers supply postgres:// or postgresql:// URLs.
    SQLAlchemy with the psycopg driver needs postgresql+psycopg://."""
    if url.startswith("postgres://"):
        url = url.replace("postgres://", "postgresql://", 1)
    if url.startswith("postgresql://"):
        url = url.replace("postgresql://", "postgresql+psycopg://", 1)
    return url


class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "change-me-in-production")

    # Postgres, e.g. postgresql+psycopg://user:pass@localhost:5432/equity_premier
    SQLALCHEMY_DATABASE_URI = _normalize_database_url(
        os.getenv(
            "DATABASE_URL",
            "postgresql+psycopg://postgres:postgres@localhost:5432/equity_premier",
        )
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    UPLOAD_DIR = Path(os.getenv("UPLOAD_DIR", str(DEFAULT_UPLOAD_DIR)))
    # Public URL prefix that maps to UPLOAD_DIR. In production set this to the
    # full backend URL so uploaded images are served by the API, e.g.
    # https://api-<project>.up.railway.app/uploads
    UPLOAD_URL_PREFIX = os.getenv("UPLOAD_URL_PREFIX", "/uploads")
    MAX_CONTENT_LENGTH = int(os.getenv("MAX_UPLOAD_MB", "10")) * 1024 * 1024
    ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "webp", "gif", "avif", "svg"}

    JWT_EXPIRES_HOURS = int(os.getenv("JWT_EXPIRES_HOURS", "12"))

    CORS_ORIGINS = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")

    # Seeded admin
    ADMIN_EMAIL = os.getenv("ADMIN_EMAIL", "admin@equitypremierhousing.com")
    ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD", "ChangeMe123!")

    # Optional Backblaze B2 (S3-compatible) storage for uploads. When the key
    # pair is set, uploads go to the bucket instead of UPLOAD_DIR.
    B2_KEY_ID = os.getenv("B2_KEY_ID", "")
    B2_APPLICATION_KEY = os.getenv("B2_APPLICATION_KEY", "")
    B2_BUCKET = os.getenv("B2_BUCKET", "Equityp")
    B2_ENDPOINT = os.getenv("B2_ENDPOINT", "https://s3.eu-central-003.backblazeb2.com")
    # Public download URL for the bucket (friendly URL for public buckets).
    B2_PUBLIC_URL = os.getenv("B2_PUBLIC_URL", "https://f003.backblazeb2.com/file/Equityp")
