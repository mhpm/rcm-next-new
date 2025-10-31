# Deploy to Vercel - Environment Variables Setup

## Issue
The Vercel deployment is failing with error P6001 because it's expecting a `prisma://` URL but receiving a direct PostgreSQL connection string.

## Solution

### 1. Set Environment Variables on Vercel Dashboard

Go to: https://vercel.com/dashboard → Your Project → Settings → Environment Variables

Add these variables for **Production**, **Preview**, and **Development**:

```bash
# Database Connection
DATABASE_URL=postgresql://neondb_owner:npg_37WCdJFsNzbI@ep-morning-union-adivgntm-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require

# Stack Auth Variables
NEXT_PUBLIC_STACK_PROJECT_ID=af58ef07-5b51-4880-8b0d-4c5d373b0f18
NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY=pck_58h08r4dk5sf9p63rjnqygvr16ypkw473zh3nzpn7ez7r
STACK_SECRET_SERVER_KEY=ssk_dvjhyth58nrczktkajka7ag9fghrp0gv8w27bsh6g5hpg
```

### 2. Alternative: Use Vercel CLI (if linked)

```bash
# Link project first
vercel link

# Add environment variables
vercel env add DATABASE_URL production
# Paste the PostgreSQL URL when prompted

vercel env add NEXT_PUBLIC_STACK_PROJECT_ID production
# Paste the value when prompted

vercel env add NEXT_PUBLIC_STACK_PUBLISHABLE_CLIENT_KEY production
# Paste the value when prompted

vercel env add STACK_SECRET_SERVER_KEY production
# Paste the value when prompted
```

### 3. Redeploy

After setting environment variables:

```bash
# Option 1: Git push (if connected to GitHub)
git add .
git commit -m "fix: update environment variables"
git push origin main

# Option 2: Direct deployment
vercel --prod
```

### 4. Test

After deployment, test your API:
- https://rcm-admin.vercel.app/api/members
- https://rcm-admin.vercel.app/api/churches
- https://rcm-admin.vercel.app/api/ministries

## Why This Fixes the Issue

The error occurs because:
1. Vercel doesn't have the `DATABASE_URL` environment variable set
2. Prisma is trying to connect but can't find a valid connection string
3. The error message about `prisma://` is misleading - it's actually just missing the PostgreSQL URL

Your local environment works because the `.env` file provides the correct `DATABASE_URL`.