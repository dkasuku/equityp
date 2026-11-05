# Built from the repo root (Railway: RAILWAY_DOCKERFILE_PATH=backend/Dockerfile).
FROM python:3.13-slim
WORKDIR /app
ENV PYTHONDONTWRITEBYTECODE=1 PYTHONUNBUFFERED=1
COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY backend/ .
CMD gunicorn -w 4 -b 0.0.0.0:${PORT:-5000} app:app
