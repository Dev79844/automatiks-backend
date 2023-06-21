# User Authentication System

- A user authentication system with email verification and rate limiter.

- Used mailtrap for email verification

## Technologies used:
- NodeJS
- ExpressJS
- MongoDB
- Mongoose

## API endpoints
- `/api/v1/signup` - registering a user
- `/api/v1/verify/:token` - verifying the user account after signup
- `/api/v1/login` - login

## Installation and Set Up
```bash
# clone the repo
git clone https://github.com/Dev79844/automatiks-backend.git

# install all the dependencies
npm install

# copy .env.example to .env and enter all the details
cp .env.example .env

# start the server
npm run start
```


