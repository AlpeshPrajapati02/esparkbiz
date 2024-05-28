# PlayStore Application

This repository contains the code and documentation for a PlayStore-like application. The application allows users to manage apps, categories, reviews, and more.

## Database Schema

The database schema for this application is designed using dbdiagram.io. You can view the detailed schema by clicking the link below:

[PlayStore Database Schema](https://dbdiagram.io/d/6655ac84b65d933879dcaac8)

## API Endpoints

### User Routes

- **POST /register**
- **POST /login**
- **GET /user**
- **PUT /update**
- **POST /app/ratingReview/:id**
- **GET /app/:id/reviews**
- **PUT /app/reviews/:id**


### Developer Routes

- **POST /dev/paymentProfile**
- **GET /dev/paymentProfile**
- **POST /dev/devAccount**
- **POST /dev/app**
- **GET /dev/apps**
- **GET /dev/app/:id**
- **PUT /dev/app/:id**
- **DELETE /dev/app/:id**
- **GET /dev/apps/:category**


### Admin Routes

- **GET /admin/users**
- **DELETE /admin/user/:id**
- **GET /admin/apps**
- **DELETE /admin/app/:id**

### Download Routes

- **POST /download/:id**
