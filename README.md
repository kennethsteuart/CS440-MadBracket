Welcome to MadBracket, a web application for a getting information on NCAA Division 1 Men's Basketball teams to be in the loop on the current contenders to personalize your own bracket for March Madness!

The conferences in this application consist of the following ...

1)SEC (Southeastern Conference)
2)ACC (Atlantic Coast Conference)
3)Big 10
4)Big 12
5)Big East

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

### Database set up
- Install MySQL
- Create a ".env" file in the backend folder and fill it in with your own information
    MYSQL_HOST=127.0.0.1
    MYSQL_USER=your_username
    MYSQL_PASSWORD=your_password
    MYSQL_DATABASE=Mad_Bracket
    NEXT_PUBLIC_API_URL=http://localhost:5001


- Run the following commands with the your own credentials:
    CREATE DATABASE Mad_Bracket;
    mysql -u your_username -p Mad_Bracket < Backend/schema.sql


## Backend 
- The backend runs on http://localhost:5001
- To run the backend follow these commands:
    cd backend
    pip install -r requirements.txt
    python3 backend.py or run some command to run the file


Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



## Team Members & Contributions

| Member            | Contributions                                                                 |
|-------------------|------------------------------------------------------------------------------|
| Chase Horne       | Backend Setup, Get stats, stored brackets, fixed get coaches                  |
| Rivers Steuart    | (Frontend) - Basis for stored_brackets page, brackets page, full welcome page, stats page (Backend) - added data into schema|
| Noah Gorospe      |                                              |
| Vicenzo Linares   |                                                 |



## Disclosure

Every team member contributed and all expectations were met.
