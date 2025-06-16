# What's this all about?
Olib is a fullstack web application meant to help manage users' books libraries.

## What frameworks/libraries does it use?

- [Typescript](https://www.typescriptlang.org/)
- [Next.js](https://nextjs.org/)
- [Lucide](https://lucide.dev/) for icons
- [HeroUI](https://www.heroui.com/) as the components library
- [Tailwind CSS](https://tailwindcss.com/) (to have Tailwind CSS like counterpart)
- [Java Spring](https://spring.io/) as the backend framework
- [PostgreSQL](https://www.postgresql.org/) as the database

## How to spin this up?

1. Fill frontend/.env and ./.env according to your needs. Most important environmental variables are `POSTGRES_USER` and `POSTGRES_PASSWORD` from ./.env file and `NEXT_PUBLIC_FRONTEND_URL` from frontend/.env file (it should be set to domain name where the app is being hosted in order to correctly fetch uploaded images urls).
2. Build and run database using `docker compose up --build olib-database`.
3. Get into the spring service using `docker compose run olib-spring /bin/sh`.
4. In the spring service run `./mvnw package`.
5. Exit service and up the spring service using `docker compose up -d olib-spring`. 
6. Build frontend using `docker compose build olib-frontend`.
7. Run frontend using `docker compose up olib-frontend`.

Why are we building it step by step instead of just using `docker compose up --build`? I've encountered the problem where during build spring's building script does `./mvnw spring` and it can't really finish, because it tries to connect to the database which is unavailable because docker doesn't allow for network connections during building process. 

## Cool points 😏

- simple yet good design
- library sharing
- stats
- read books scores
- easy search for books data by ISBN
- categorize books by your own shelves

## What's the state of this app?
As Olib was meant to be an application created for "Programming in Java" classes, further development has finished after the project was submitted. Application is fully functional, meaning that it can be easily extended with new functionality.