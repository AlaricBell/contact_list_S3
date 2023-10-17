## Introduction

This project was written in [Nextjs](https://nextjs.org) using [Zustand](https://github.com/pmndrs/zustand) and [react-query](https://tanstack.com/query/v3/) as state management and [Prisma](https://www.prisma.io/nextjs) as local database.

## Getting started

**The project uses environmental variables, you can find them in the `.env.local` file in the root folder**
Everything is set up to run the project smoothly, change the variables if you wish to run on your environment.
**AWS_REGION** should not be changed, only `eu-north-1` is enabled for image preview, update `next.config.js` if your region is different.

install dependencies:

```bash
npm run dev
# or
yarn dev
```

run the development server:

```bash
npm run dev
# or
yarn dev
```

## Known issues

- **PrismaClientInitializationError**: on production, work in progress but the production build is not usable until then.
- **S3 bucket management**: Assets should be deleted according to the updated avatars
- **Validation**: No validation for input data.
