# Hotel Dashboard Graphs

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

### [Deployed Link 🖇️]("https://hotel-dashboard-graphs-driptanil.vercel.app/"):

"https://hotel-dashboard-graphs-driptanil.vercel.app/"

## Tools Used:

- Next JS 14: https://nextjs.org/
- Prisma ORM: https://www.prisma.io/
- tRPC: https://trpc.io/
- MongoDB: https://www.mongodb.com/
- TailwindCSS: https://tailwindcss.com/
- ShadCN UI: https://ui.shadcn.com/
- ApexCharts: https://apexcharts.com/
- ReCharts: https://recharts.org/
- React Testing Library https://testing-library.com/docs/react-testing-library/intro/
- Zest Testing https://jestjs.io/

## Important Points

- **_API Endpoints:_** Defined in `"@/trpc/index.ts file"`

- **_Database Schema:_** Defined in `"@/prisma/schema.prisma file"`

- **_Test:_** Defined in `"*/__test__"`

## Getting Started

Add a .env file

```
DATABASE_URL=""
```

Install Command:

```
npm install
```

First, run the development server:

```bash
npm run dev
```

Vercel Production Build Command:

```bash
npx prisma generate && next build
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## Testing

```
npm install -D @testing-library/jest-dom@5.16.5 @testing-library/react @testing-library/user-event jest jest-environment-jsdom ts-jest

npm install -D eslint-plugin-jest-dom eslint-plugin-testing-library
```
