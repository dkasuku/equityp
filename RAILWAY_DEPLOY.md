# Deploying Equity Premier Housing Solutions to Railway

Full-stack app: Next.js frontend (`nextjs/`) + Flask API (`backend/`) + PostgreSQL, with uploads stored in Backblaze B2.

Target domain: **https://equitypremierhousing.com**

## 1. Push the code to GitHub

Create a new repository (e.g. `equitypremierhousing`) and push this folder to its `main` branch.

## 2. Create the Railway project and database

1. In Railway, click **New Project → Provision PostgreSQL**.
2. The database exposes a `DATABASE_URL` variable you will reference from the backend.

## 3. Backend service (Flask API)

1. **New → GitHub Repo**, pick the repo, set **Root Directory** to `backend`.
2. Name it `equity-backend`.
3. Add these **Variables**:

   | Variable | Value |
   | --- | --- |
   | `DATABASE_URL` | `${{Postgres.DATABASE_URL}}` |
   | `SECRET_KEY` | a long random string (e.g. `python -c "import secrets;print(secrets.token_hex(32))"`) |
   | `ADMIN_EMAIL` | `admin@equitypremierhousing.com` (or your own) |
   | `ADMIN_PASSWORD` | a strong password, not `ChangeMe123!` |
   | `CORS_ORIGINS` | `https://equitypremierhousing.com,https://www.equitypremierhousing.com` (add the Railway frontend URL too while testing) |
   | `B2_KEY_ID` | your Backblaze **keyID** |
   | `B2_APPLICATION_KEY` | your Backblaze **applicationKey** |
   | `B2_BUCKET` | `Equityp` |
   | `B2_ENDPOINT` | `https://s3.eu-central-003.backblazeb2.com` |
   | `B2_PUBLIC_URL` | `https://f003.backblazeb2.com/file/Equityp` |

   Create the key in Backblaze under **Application Keys → Add a New Application Key**, giving it **Read and Write** access to the `Equityp` bucket. The application key is shown only once, so copy it straight away.

4. Deploy. Under **Settings → Networking**, generate a domain (e.g. `https://equity-backend.up.railway.app`) or attach `api.equitypremierhousing.com`.

## 4. Seed the database

Open the backend service's shell (or run `railway run` locally) and run:

```bash
python seed.py --prune
```

This creates the admin user and loads the listings, blog posts and page sections. `--prune` also deletes anything that isn't in `seed_content.json`, such as old Anchor land listings in a reused database. Run it again whenever you change `seed_content.json`. Warning: it also deletes listings or posts added only through the admin panel. Use plain `python seed.py` to keep those.

## 5. Frontend service (Next.js)

1. **New → GitHub Repo**, same repo, **Root Directory** `nextjs`, name it `equity-frontend`.
2. Variable:

   | Variable | Value |
   | --- | --- |
   | `NEXT_PUBLIC_API_URL` | the backend URL from step 3, e.g. `https://equity-backend.up.railway.app` |

   This is read at **build time**, so set it before the first deploy and redeploy if it changes.
3. Deploy.

## 6. Connect the domain

1. Frontend service → **Settings → Networking → Custom Domain** → add `equitypremierhousing.com` and `www.equitypremierhousing.com`.
2. At your domain registrar, add the CNAME/ALIAS records Railway shows you.
3. Make sure both domains are in the backend's `CORS_ORIGINS`, then redeploy the backend.

## 7. Go live checklist

- [ ] Log in at `https://equitypremierhousing.com/admin` and change any default password.
- [ ] **Media** page: upload real photos of the Mamburi maisonettes and Echoes of Afrika (they go to the `Equityp` bucket).
- [ ] **Properties**: set those photos as each listing's hero, card and gallery images (they currently use Unsplash stock photos).
- [ ] Optionally replace the gallery, hero and section images under **Sections**.
- [ ] Send a test enquiry from the contact form and check it shows under **Enquiries**.

## Troubleshooting

- **Old Anchor content still showing**: run `python seed.py --prune` on the backend. The frontend refreshes within 30 seconds.
- **Uploads fail**: check that all four `B2_*` values are set and that the key has write access to `Equityp`.
- **CORS errors in the browser**: the frontend's exact origin (with `https://`, no trailing slash) must be in `CORS_ORIGINS`.
- **Admin login fails**: the seed hasn't run yet, or `ADMIN_EMAIL`/`ADMIN_PASSWORD` changed after seeding. Run `python reset_admin.py`.
