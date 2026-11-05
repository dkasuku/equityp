"""Seed the database with the admin user, properties and all site sections.

Usage:  python seed.py           (idempotent - updates existing rows)
        python seed.py --reset   (drops and recreates all tables first)
        python seed.py --prune   (also deletes listings, posts and sections that are
                                  no longer in seed_content.json, e.g. old Anchor content)
"""

import json
import sys
from datetime import datetime
from pathlib import Path

from app import create_app
from extensions import db
from models import AdminUser, BlogPost, Property, SiteSection


# Content is exported from the Next.js defaults so the CMS and the static
# fallback stay identical: `node --experimental-strip-types scripts/export-seed-content.mjs`
with open(Path(__file__).with_name("seed_content.json"), encoding="utf-8") as fh:
    _CONTENT = json.load(fh)

PROPERTIES = _CONTENT["properties"]
POSTS = [
    {**p, "published_at": datetime.fromisoformat(p["published_at"].replace("Z", "+00:00"))} if p.get("published_at") else p
    for p in _CONTENT["posts"]
]
SECTIONS = [tuple(s) for s in _CONTENT["sections"]]


def seed(reset: bool = False, prune: bool = False):
    app = create_app()
    with app.app_context():
        if reset:
            db.drop_all()
            db.create_all()
            print("· tables reset")

        # --- admin user ---
        email = app.config["ADMIN_EMAIL"].lower()
        user = AdminUser.query.filter_by(email=email).first()
        if not user:
            user = AdminUser(email=email, name="Administrator")
            user.set_password(app.config["ADMIN_PASSWORD"])
            db.session.add(user)
            print(f"· admin created: {email}")
        else:
            print(f"· admin exists:  {email}")

        # --- properties ---
        # Listings sort newest-first, so insert in reverse to keep the file order on site.
        for data in reversed(PROPERTIES):
            prop = Property.query.filter_by(slug=data["slug"]).first()
            if not prop:
                prop = Property(**data)
                db.session.add(prop)
                print(f"· property added:   {data['name']}")
            else:
                for k, v in data.items():
                    setattr(prop, k, v)
                print(f"· property updated: {data['name']}")

        # --- blog posts ---
        for data in POSTS:
            post = BlogPost.query.filter_by(slug=data["slug"]).first()
            if not post:
                db.session.add(BlogPost(**data))
                print(f"· post added:      {data['title'][:44]}")
            else:
                for k, v in data.items():
                    setattr(post, k, v)
                print(f"· post updated:    {data['title'][:44]}")

        # --- site sections ---
        for key, label, page, content in SECTIONS:
            section = SiteSection.query.filter_by(key=key).first()
            if not section:
                db.session.add(SiteSection(key=key, label=label, page=page, content=content))
                print(f"· section added:   {key}")
            else:
                section.label, section.page = label, page
                if not section.content:
                    section.content = content
                else:
                    # Merge seed content so updated defaults (e.g. phone numbers) propagate
                    # while preserving any CMS keys that are not present in the seed.
                    section.content = {**section.content, **content}
                    # Remove hero CTA keys that were dropped from the seed so buttons stay off non-home pages.
                    for stale in ("primaryLabel", "primaryHref", "secondaryLabel", "secondaryHref"):
                        section.content.pop(stale, None)
                print(f"· section updated:  {key}")

        db.session.commit()
        print("\nSeed complete.")
        print(f"Login at /admin with: {email}")


if __name__ == "__main__":
    seed(reset="--reset" in sys.argv, prune="--prune" in sys.argv)
