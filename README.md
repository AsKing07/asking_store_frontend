
# Asking Store

An ecommerce web project carried out with NextJs, MongoDB, with Stripe and KKipay as payment methods


## Screenshots

![1](https://github.com/AsKing07/asking_store_frontend/blob/main/1.png)
![2](https://github.com/AsKing07/asking_store_frontend/blob/main/2.png)
![3](https://github.com/AsKing07/asking_store_frontend/blob/main/3.png)


## Features

- All Products Page
- Latest Products
- Categories of products
- Cart Management 
- Comments on single product page
- Search functionnality
- List of favorites products
- Payement by Stripe and KKiapay
- Sending email when a order is paid
- Contact Page with Form Contact
- And many others


## Tech Stack

**Client:** NextJs, StyledComponents

**Server:** NextJs, MONGODB

**PACKAGE:** Axios, KKiapay, KKiapay-react, lodash, micro, mongoose, nodemailer, react-modal,react-phone-number-input, react-spinners, stripe, styled-components
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`MONGODB_URI`:Mongo DB url

`STRIPE_SK`:Stripe secret key

`NEXT_PUBLIC_PUBLIC_URL`: url of your web site

`KKPAY_PK`: Kkiapay public api key

`GOOGLE_FRONT_ID`: Google Cloud Console, Credential ID you have to create a project and create credential

`GOOGLE_FRONT_SECRET`: Google Cloud Console, Credential secret key

`GOOGLE_APP_PASSWORD`: Google app password generate in your google accounte, "Passwords for applications" in order to use Nodemailer.createTransport 

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

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation]
## Authors

- [@AsKing07](https://www.github.com/AsKing07)


## License

[MIT](https://choosealicense.com/licenses/mit/)

