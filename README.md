
### GENERAL  ###
# Weather Subscription Service

A backend API that allows users to subscribe to weather updates for a selected city. Users receive updates via email either hourly or daily, depending on their chosen frequency. Built with Node.js, Express, PostgreSQL, and WeatherAPI.com.
I use VM ubuntu for simulate real production)))

## Features

- 🌐 RESTful API (documented via Swagger)
- 📬 Email confirmation and unsubscribe links
- 🔄 Hourly & daily cron-based updates
- 🌍 City autocomplete using WeatherAPI search
- 📥 HTML subscription form
- 🧪 Tests with Jest & Supertest
- 🐳 Dockerized deployment

## Technologies

- Node.js, Express
- PostgreSQL + Sequelize
- Nodemailer
- WeatherAPI.com
- Docker + Docker Compose
- Jest + Supertest

## ⚙️ Installation & Usage

### 1. Clone and start the project

```bash
git clone https://github.com/Illiakuzhym/weather_test.git
cd weather_test
docker compose up --build
```

### DETAIL ###
# API Endpoints

1) GET /api/weather?city=Kyiv
Returns weather data for a specific city.

Response:
{
  "temperature": 22,
  "humidity": 40,
  "description": "Clear"
}

2) POST /api/subscribe
Subscribe user to weather updates.

Form fields:
email (string, required)
city (string, required)
requency (string: daily or hourly, required)

Responses:
200 OK — Subscription created, confirmation sent
409 Conflict — Already subscribed
400 Bad Request — Invalid input

# Subscribtion is more simple with html form

3) GET /api/confirm/:token
Confirm subscription via token (sent by email).
200 OK — Confirmed
404 Not Found — Token not valid

# You must confirm your subscription in email.

4) GET /api/unsubscribe/:token
Unsubscribe from weather updates.
200 OK — Unsubscribed
404 Not Found — Token not found

# If you want to unsubscribe, you can press button in weather forecast letter.

## ⚠️ Notes on API design

This project fully follows the provided Swagger (OpenAPI) specification without changes to endpoints, request formats, or response contracts, as required by the task.

However, I would like to point out that certain aspects of the specification could be improved from a design perspective. For example:

- `POST /subscribe` uses `application/x-www-form-urlencoded` instead of `application/json`, which is less typical for modern APIs.
- `/confirm/{token}` and `/unsubscribe/{token}` rely on exposing raw tokens in GET URLs — this may not be ideal for long-term security and RESTfulness.
- There is no route for listing subscriptions or checking status (useful for development or admin tools).

These points were not changed in the implementation, in full respect of the given task constraints.

### ENV file ###

PORT=3000
DB_USER=postgres
DB_PASSWORD=PASSWORD
DB_NAME=weather_db
DB_HOST=localhost
DB_PORT=5433
DB_TEST_PORT=5432
WEATHER_API_KEY=your_key
EMAIL_FROM=test@example.com
EMAIL_PASS=password
EMAIL_APP_PASS=your_app_password
DB_NAME_TEST=weather_test
BASE_URL=BASE_URL