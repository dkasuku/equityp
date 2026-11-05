"""Upload storage: Backblaze B2 when configured, local UPLOAD_DIR otherwise."""

import os
from pathlib import Path

from flask import current_app


def _b2_client():
    cfg = current_app.config
    if not (cfg["B2_KEY_ID"] and cfg["B2_APPLICATION_KEY"]):
        return None
    import boto3
    from botocore.config import Config as BotoConfig

    # Path-style addressing: the bucket name has uppercase letters.
    return boto3.client(
        "s3",
        endpoint_url=cfg["B2_ENDPOINT"],
        aws_access_key_id=cfg["B2_KEY_ID"],
        aws_secret_access_key=cfg["B2_APPLICATION_KEY"],
        config=BotoConfig(s3={"addressing_style": "path"}, signature_version="s3v4"),
    )


def save_upload(file, filename: str) -> tuple[str, int]:
    """Store an uploaded file and return (public_url, size_in_bytes)."""
    cfg = current_app.config
    client = _b2_client()
    if client:
        data = file.read()
        client.put_object(
            Bucket=cfg["B2_BUCKET"], Key=f"uploads/{filename}", Body=data,
            ContentType=file.mimetype or "application/octet-stream",
        )
        return f"{cfg['B2_PUBLIC_URL'].rstrip('/')}/uploads/{filename}", len(data)

    upload_dir: Path = cfg["UPLOAD_DIR"]
    upload_dir.mkdir(parents=True, exist_ok=True)
    path = upload_dir / filename
    file.save(path)
    return f"{cfg['UPLOAD_URL_PREFIX']}/{filename}", path.stat().st_size


def delete_upload(filename: str, url: str) -> None:
    cfg = current_app.config
    client = _b2_client()
    if client and url.startswith(cfg["B2_PUBLIC_URL"].rstrip("/")):
        try:
            # Bucket keeps all versions, so remove every version of the key.
            key = f"uploads/{filename}"
            versions = client.list_object_versions(Bucket=cfg["B2_BUCKET"], Prefix=key)
            for v in versions.get("Versions", []):
                if v["Key"] == key:
                    client.delete_object(Bucket=cfg["B2_BUCKET"], Key=key, VersionId=v["VersionId"])
        except Exception:
            pass
        return

    path: Path = cfg["UPLOAD_DIR"] / filename
    try:
        if path.exists():
            os.remove(path)
    except OSError:
        pass
