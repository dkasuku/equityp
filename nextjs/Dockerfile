# Built from the repo root (Railway: RAILWAY_DOCKERFILE_PATH=nextjs/Dockerfile).
FROM node:22-alpine
WORKDIR /app
# Railway passes service variables as build args; Next inlines this at build time.
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL NEXT_TELEMETRY_DISABLED=1
COPY nextjs/package.json nextjs/package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY nextjs/ .
RUN npm run build
ENV NODE_ENV=production
CMD ["npm", "run", "start"]
